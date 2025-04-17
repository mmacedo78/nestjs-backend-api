import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNumber()
    age: number;

    @ApiProperty({ required: false, default: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}