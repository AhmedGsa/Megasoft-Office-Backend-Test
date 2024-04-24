import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeder/seeder.module";
import { SeederService } from "./seeder/seeder.service";
import { Logger } from "@nestjs/common";


async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
      .then(appContext => {
        const seeder = appContext.get(SeederService);
        seeder
          .seed()
          .then(() => {
            const logger = new Logger();
            logger.debug('Seeding complete!');
          })
          .catch(error => {
            const logger = new Logger()
            logger.error('Seeding failed!');
            throw error;
          })
          .finally(() => appContext.close());
      })
      .catch(error => {
        throw error;
      });
  }
  bootstrap();