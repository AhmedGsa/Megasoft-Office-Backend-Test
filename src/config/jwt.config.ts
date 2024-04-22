import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtConfig {
    constructor(private readonly configService: ConfigService) {}

    getAccessTokenSecret(): string {
        return this.configService.get('JWT_ACCESS_TOKEN_SECRET');
    }

    getAccessTokenExpiresIn(): string {
        return this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN');
    }

    getRefreshTokenSecret(): string {
        return this.configService.get('JWT_REFRESH_TOKEN_SECRET');
    }

    getRefreshTokenExpiresIn(): string {
        return this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN');
    }
}