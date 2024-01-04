import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { ConfigModule } from '@nestjs/config';

// console.log(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    RoutesModule,
  ],
})
export class AppModule {}
