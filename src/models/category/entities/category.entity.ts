import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/models/product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the category' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'electronics', description: 'The unique name of the category' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Electronic devices and accessories', description: 'Category description', required: false })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'https://example.com/electronics.jpg', description: 'Category image URL', required: false })
  imageUrl: string;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Whether the category is active', default: true })
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({ description: 'Products belonging to this category' })
  products: Product[];
}