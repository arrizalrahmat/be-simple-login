import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { MongoDriver } from '@mikro-orm/mongodb';

const config: MikroOrmModuleOptions = {
  entities: ['dist/src/users/entities'],
  entitiesTs: ['src/users/entities'],
  clientUrl: 'mongodb://localhost:27017/simple-login', // change databaseName as needed
  dbName: 'simple-login', // ensure this matches your actual database name
  driver: MongoDriver,
};

export default config;
