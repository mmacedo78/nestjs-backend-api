import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    firstName?: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    lastName?: string;

    @ApiProperty({ required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    age?: number;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}