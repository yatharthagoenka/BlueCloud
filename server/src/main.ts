import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require("dotenv")

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.enableCors();
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST)
      .then(() => {
        console.log(`Server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
      })
      .catch((error) => {
        console.error(`Failed to start server: ${error}`);
      });
}
bootstrap();

