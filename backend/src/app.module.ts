import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ModelsModule } from './models/models.module';
import { PinataModule } from './pinata/pinata.module';
import { FileModule } from './common/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_API_TOKEN),
    UsersModule,
    AuthModule,
    ModelsModule,
    PinataModule,
    FileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

