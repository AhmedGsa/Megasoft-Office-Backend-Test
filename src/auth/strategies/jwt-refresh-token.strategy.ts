import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "src/config/jwt.config";
import { UserPayload } from "../interfaces/user-payload.interface";


@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly jwtConfig: JwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.getRefreshTokenSecret(),
    })
  }

  async validate(payload: any) : Promise<UserPayload> {
    return { userId: payload.userId, email: payload.email}
  }
}