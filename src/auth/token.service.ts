import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtConfig } from "src/config/jwt.config";
import { UserPayload } from "./interfaces/user-payload.interface";


@Injectable()
export class TokenService {
    constructor(
        private readonly JwtService: JwtService,
        private readonly JwtConfig: JwtConfig,
    ) {}

    async generateAccessToken(payload: UserPayload) {
        return await this.JwtService.signAsync(payload, {
            secret: this.JwtConfig.getAccessTokenSecret(),
            expiresIn: this.JwtConfig.getAccessTokenExpiresIn(),
        });
    }

    async generateRefreshToken(payload: UserPayload) {
        return await this.JwtService.signAsync(payload, {
            secret: this.JwtConfig.getRefreshTokenSecret(),
            expiresIn: this.JwtConfig.getRefreshTokenExpiresIn(),
        });
    }
}