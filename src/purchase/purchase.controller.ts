import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@ApiTags('purchases')
@ApiBearerAuth()
@Controller('purchases')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @Roles(UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Create a new purchase' })
  @ApiResponse({ status: 201, description: 'Purchase created successfully', type: Purchase })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Products not found' })
  async create(@Request() req, @Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.create(req.user, createPurchaseDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all purchases (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all purchases', type: [Purchase] })
  async findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get('my-purchases')
  @Roles(UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Get current user purchases' })
  @ApiResponse({ status: 200, description: 'List of user purchases', type: [Purchase] })
  async findMyPurchases(@Request() req): Promise<Purchase[]> {
    return this.purchaseService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a purchase by ID' })
  @ApiResponse({ status: 200, description: 'Purchase found', type: Purchase })
  @ApiResponse({ status: 404, description: 'Purchase not found' })
  async findOne(@Request() req, @Param('id') id: string): Promise<Purchase> {
    return this.purchaseService.findOne(+id, req.user.role === UserRole.CUSTOMER ? req.user : undefined);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a purchase (Admin only)' })
  @ApiResponse({ status: 200, description: 'Purchase updated', type: Purchase })
  @ApiResponse({ status: 404, description: 'Purchase not found' })
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a purchase (Admin only)' })
  @ApiResponse({ status: 204, description: 'Purchase deleted' })
  @ApiResponse({ status: 404, description: 'Purchase not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.purchaseService.remove(+id);
  }
}