import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from "./module/mongo/mongo.module"
import { AuthModule } from "./module/auth/auth.module"
import { UserModule } from "./module/user/user.module"
import { MailModule } from "./module/mail/mail.module"
import { RedisModule } from "./module/redis/redis.module"
import { KafkaModule } from "./module/kafka/kafka.module"
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./ormconfig"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UserModule,
    MongoModule,
    MailModule,
    RedisModule,
    KafkaModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule { }