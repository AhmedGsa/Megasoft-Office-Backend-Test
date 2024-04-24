import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule, EnvConfigModule, DatabaseModule, SeederModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
