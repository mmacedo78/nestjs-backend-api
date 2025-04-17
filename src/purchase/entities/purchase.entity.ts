import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { PurchaseItem } from './purchase-item.entity';
import { Exclude } from 'class-transformer';

export enum PurchaseStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the purchase' })
  id: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => User })
  user: User;

  @Column()
  @Exclude()
  userId: number;

  @OneToMany(() => PurchaseItem, (item) => item.purchase, { cascade: true })
  @ApiProperty({ type: () => [PurchaseItem] })
  items: PurchaseItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ example: 99.99, description: 'Total amount of the purchase' })
  totalAmount: number;

  @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.PENDING })
  @ApiProperty({ 
    enum: PurchaseStatus,
    example: PurchaseStatus.PENDING,
    description: 'Current status of the purchase'
  })
  status: PurchaseStatus;

  @Column({ nullable: true })
  @ApiProperty({ example: 'TRX123456', description: 'Transaction reference ID', required: false })
  transactionId?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '123 Main St', description: 'Shipping address', required: false })
  shippingAddress?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}