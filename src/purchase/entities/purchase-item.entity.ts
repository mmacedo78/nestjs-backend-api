import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Purchase } from './purchase.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the purchase item' })
  id: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @Column()
  purchaseId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  @ApiProperty({ type: () => Product })
  product: Product;

  @Column()
  productId: number;

  @Column()
  @ApiProperty({ example: 2, description: 'Quantity purchased' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ example: 49.99, description: 'Price per unit at time of purchase' })
  unitPrice: number;
}