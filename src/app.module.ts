import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from 'mikro-orm.config';

@Module({
  imports: [UsersModule, MikroOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
