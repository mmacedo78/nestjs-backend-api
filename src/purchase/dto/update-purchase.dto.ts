import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PurchaseStatus } from '../entities/purchase.entity';

export class UpdatePurchaseDto {
  @ApiProperty({ enum: PurchaseStatus, required: false })
  @IsEnum(PurchaseStatus)
  @IsOptional()
  status?: PurchaseStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shippingAddress?: string;
}