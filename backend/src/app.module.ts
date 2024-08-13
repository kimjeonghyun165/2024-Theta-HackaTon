import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ModelsModule } from './models/models.module';
import { GenerateModelModule } from './generate-model/generate-model.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_DEV_API_TOKEN),
    UsersModule,
    AuthModule,
    ModelsModule,
    GenerateModelModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

