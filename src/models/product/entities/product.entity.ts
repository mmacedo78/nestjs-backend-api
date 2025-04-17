import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the product' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Smartphone', description: 'The name of the product' })
  name: string;

  @Column('text')
  @ApiProperty({ example: 'Latest model with advanced features', description: 'Product description' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 599.99, description: 'Product price' })
  price: number;

  @Column()
  @ApiProperty({ example: 'electronics', description: 'Product category' })
  category: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 100, description: 'Quantity in stock', default: 0 })
  stock: number;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Whether the product is active', default: true })
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}