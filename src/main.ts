import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/mongodb';
import { User } from './users/entities/user.entity';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  users: EntityRepository<User>;
};

async function bootstrap() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.users = DI.orm.em.getRepository(User);
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  await app.listen(3000);
}
bootstrap();
