import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { PurchaseItem } from './entities/purchase-item.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(PurchaseItem)
    private readonly purchaseItemRepository: Repository<PurchaseItem>,
  ) {}

  async create(user: User, createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    // Get product IDs from the request
    const productIds = createPurchaseDto.items.map(item => item.productId);
    
    // Fetch products in one query
    const products = await this.productRepository.find({
      where: { id: In(productIds) }
    });

    // Validate all products exist
    if (products.length !== productIds.length) {
      const foundIds = products.map(p => p.id);
      const missingIds = productIds.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`Products not found: ${missingIds.join(', ')}`);
    }

    // Create purchase items with product details
    const purchaseItems = createPurchaseDto.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      const purchaseItem = new PurchaseItem();
      purchaseItem.productId = product.id;
      purchaseItem.quantity = item.quantity;
      purchaseItem.unitPrice = product.price;
      return purchaseItem;
    });

    // Calculate total amount
    const totalAmount = purchaseItems.reduce(
      (sum, item) => sum + (item.unitPrice * item.quantity),
      0
    );

    // Create and save the purchase
    const purchase = this.purchaseRepository.create({
      user,
      items: purchaseItems,
      totalAmount,
      status: createPurchaseDto.status || PurchaseStatus.PENDING,
      transactionId: createPurchaseDto.transactionId,
      shippingAddress: createPurchaseDto.shippingAddress,
    });

    return this.purchaseRepository.save(purchase);
  }

  async findAll(user?: User): Promise<Purchase[]> {
    const where = user ? { userId: user.id } : {};
    return this.purchaseRepository.find({
      where,
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user?: User): Promise<Purchase> {
    const where = user ? { id, userId: user.id } : { id };
    const purchase = await this.purchaseRepository.findOne({
      where,
      relations: ['user', 'items', 'items.product'],
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    return purchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneBy({ id });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    Object.assign(purchase, updatePurchaseDto);
    return this.purchaseRepository.save(purchase);
  }

  async remove(id: number): Promise<void> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    // Delete purchase items first
    await this.purchaseItemRepository.remove(purchase.items);
    await this.purchaseRepository.remove(purchase);
  }
}