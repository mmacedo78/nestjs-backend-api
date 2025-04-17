import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

  @Column()
  @ApiProperty({ example: 30, description: 'The age of the user' })
  age: number;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Whether the user is active or not' })
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: 'The creation date of the user record' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The last update date of the user record' })
  updatedAt: Date;
}