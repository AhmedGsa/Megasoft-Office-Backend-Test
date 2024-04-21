import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from 'src/config/config.module';
import { DatabaseConfig } from 'src/config/database.config';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [EnvConfigModule],
        useFactory: async (databaseConfig: DatabaseConfig) => ({
            type: databaseConfig.getType(),
            host: databaseConfig.getHost(),
            port: databaseConfig.getPort(),
            username: databaseConfig.getUsername(),
            password: databaseConfig.getPassword(),
            database: databaseConfig.getDatabaseName(),
            synchronize: databaseConfig.getSynchronize(),
            charset: "utf8mb4",
            collation: "utf8mb4_unicode_ci",
            entities: []
        }),
        inject: [DatabaseConfig],
    })],
})
export class DatabaseModule {}