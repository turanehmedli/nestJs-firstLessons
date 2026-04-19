import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() email: string;

  @Column() passwordHash: string;

  @Column({ nullable: true }) name?: string;

  @Column({ default: false }) isVerified: boolean;

  @Column({ default: false }) isPrivate: boolean;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}