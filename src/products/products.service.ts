import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return { msg: 'Product created successfully', product };
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    product.name = updateProductDto.name || product.name;
    product.price = updateProductDto.price || product.price;
    product.category = updateProductDto.category || product.category;
    await this.productRepository.save(product);
    return { msg: 'Product updated successfully', product };
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    await this.productRepository.remove(product);
    return { msg: 'Product deleted successfully' };
  }
}
