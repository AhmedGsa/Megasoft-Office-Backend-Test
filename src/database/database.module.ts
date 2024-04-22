import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from 'src/config/config.module';
import { DatabaseConfig } from 'src/config/database.config';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [EnvConfigModule],
        useFactory: async (databaseConfig: DatabaseConfig) => ({
            type: "postgres",
            host: databaseConfig.getHost(),
            port: databaseConfig.getPort(),
            username: databaseConfig.getUsername(),
            password: databaseConfig.getPassword(),
            database: databaseConfig.getDatabaseName(),
            synchronize: databaseConfig.getSynchronize(),
            charset: "utf8mb4",
            collation: "utf8mb4_unicode_ci",
            entities: [User, Product]
        }),
        inject: [DatabaseConfig],
    })],
})
export class DatabaseModule {}