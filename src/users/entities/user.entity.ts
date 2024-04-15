import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  _id!: string;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  latestLogin: Date = new Date();

  @Property()
  deleted: boolean = false;
}
