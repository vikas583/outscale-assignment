import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserPermissions } from "../types";
import { Books } from "./Books";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false, unique: true })
  password!: string;

  @Column({
    array: true,
    type: "enum",
    enum: UserPermissions,
    default: [UserPermissions.read],
    nullable: false,
  })
  roles!: UserPermissions[];

  @OneToMany(() => Books, (books) => books.userId)
  books: Books[];

  // @OneToMany(() => Trigger, (trigger) => trigger.user)
  // triggers: Trigger[];

  // which user created this?
  @Column({ nullable: true })
  createdBy?: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;
}
