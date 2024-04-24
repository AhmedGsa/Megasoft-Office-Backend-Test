import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import * as data from './data.json';
import { Hash } from "src/auth/utils/hash";
import { Role } from "src/users/enum/role.enum";
import { Category } from "src/products/enum/category.enum";


@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async seed() {
    const { users, products } = data;
    await Promise.all(users.map(async (user) => {
        const userExists = await this.userRepository.findOneBy({ email: user.email });
        if (!userExists) {
            const newUser = this.userRepository.create({...user, password: await Hash.hash(user.password), role: Role[user.role]});
            await this.userRepository.save(newUser);
        }
    }));
    await Promise.all(products.map(async (product) => {
        const productExists = await this.productRepository.findOneBy({ name: product.name });
        if (!productExists) {
            const newProduct = this.productRepository.create({...product, category: Category[product.category]});
            await this.productRepository.save(newProduct);
        }
    }));
  }
}