import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  title: string;

  // 0=> Unpublish, 1=> publish
  @Column({ default: true })
  isPublish: boolean;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ nullable: false })
  userId: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;
}
