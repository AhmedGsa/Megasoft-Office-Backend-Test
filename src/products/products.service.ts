import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Between, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { FilterProductsDto } from './dto/filter-product.dto';

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

  async filter(filterProductsDto: FilterProductsDto) {
    const [products, total] = await this.productRepository.findAndCount({
      where: {
        name: filterProductsDto.name ? ILike(`%${filterProductsDto.name}%`) : undefined,
        category: filterProductsDto.category? filterProductsDto.category : undefined,
        price: filterProductsDto.minPrice && filterProductsDto.maxPrice ? Between(filterProductsDto.minPrice, filterProductsDto.maxPrice) : filterProductsDto.minPrice ? MoreThanOrEqual(filterProductsDto.minPrice) : filterProductsDto.maxPrice ? LessThanOrEqual(filterProductsDto.maxPrice) : undefined
      },
      take: filterProductsDto.pageSize,
      skip: (filterProductsDto.page - 1) * filterProductsDto.pageSize,
      order: {
        [filterProductsDto.orderBy]: filterProductsDto.order,
      }
    })
    return { products, total, nbrOfPages: Math.ceil(total / filterProductsDto.pageSize)};
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
