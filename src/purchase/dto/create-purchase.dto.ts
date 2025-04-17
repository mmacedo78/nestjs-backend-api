import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseStatus } from '../entities/purchase.entity';

class PurchaseItemDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CreatePurchaseDto {
  @ApiProperty({ type: [PurchaseItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];

  @ApiProperty({ enum: PurchaseStatus, default: PurchaseStatus.PENDING })
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