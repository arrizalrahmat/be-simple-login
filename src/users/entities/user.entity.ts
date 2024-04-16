import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  BeforeCreate,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb'; // Import ObjectId from MikroORM's MongoDB package
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryKey()
  _id: ObjectId = new ObjectId();

  @SerializedPrimaryKey()
  id!: string; // This is a string representation of the ObjectId

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  latestLogin: Date = new Date();

  @Property()
  deleted: boolean = false;

  @BeforeCreate()
  hashPassword() {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
  }
}
