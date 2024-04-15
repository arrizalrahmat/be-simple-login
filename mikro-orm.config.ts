import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { MongoDriver } from '@mikro-orm/mongodb';

const config: MikroOrmModuleOptions = {
  entities: ['dist/src/users/entities'],
  entitiesTs: ['src/users/entities'],
  clientUrl: 'mongodb://localhost:27017/simple-login',
  dbName: 'simple-login',
  driver: MongoDriver,
  debug: true,
};

export default config;
