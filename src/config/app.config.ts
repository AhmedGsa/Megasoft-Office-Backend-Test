import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AppConfig {
    constructor(private readonly configService: ConfigService) {}
    getPort() {
        return this.configService.get<string>('PORT');
    }
}