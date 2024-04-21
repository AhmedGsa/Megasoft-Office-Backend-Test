import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
    constructor(private readonly configService: ConfigService) {}

    getHost(): string {
        return this.configService.get('DATABASE_HOST');
    }
    getPort(): number {
        return this.configService.get('DATABASE_PORT');
    }
    getUsername(): string {
        return this.configService.get('DATABASE_USERNAME');
    }
    getPassword(): string {
        return this.configService.get('DATABASE_PASSWORD');
    }
    getDatabaseName(): string {
        return this.configService.get('DATABASE_NAME');
    }
    getType(): 'mysql' | 'postgres' | 'sqlite' {
        return this.configService.get('DATABASE_TYPE');
    }
    getSynchronize(): boolean {
        return this.configService.get('DATABASE_SYNCHRONIZE');
    }
}