import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database.config';
import { JwtConfig } from './jwt.config';
import { AppConfig } from './app.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })],
  providers: [AppConfig, DatabaseConfig, JwtConfig],
  exports: [AppConfig, DatabaseConfig, JwtConfig],
})
export class EnvConfigModule {}