import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtConfig {
    constructor(private readonly configService: ConfigService) {}

    getSecret(): string {
        return this.configService.get('JWT_SECRET');
    }

    getExpiresIn(): string {
        return this.configService.get('JWT_EXPIRES_IN');
    }
}