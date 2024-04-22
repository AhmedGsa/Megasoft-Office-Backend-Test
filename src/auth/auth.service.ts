import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TokenService } from './token.service';
import { RegisterDto } from './dtos/register.dto';
import { Role } from 'src/users/enum/role.enum';
import { LoginDto } from './dtos/login.dto';
import { Hash } from './utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const user = await this.usersService.create({...registerDto, role: Role.USER});
    const accessToken = await this.tokenService.generateAccessToken({userId: user.id, email: user.email});
    const refreshToken = await this.tokenService.generateRefreshToken({userId: user.id, email: user.email});
    return {accessToken, refreshToken};
  }

  async registerAccountant(registerDto: RegisterDto) {
    const user = await this.usersService.create({...registerDto, role: Role.ACCOUNTANT});
    const accessToken = await this.tokenService.generateAccessToken({userId: user.id, email: user.email});
    const refreshToken = await this.tokenService.generateRefreshToken({userId: user.id, email: user.email});
    return {accessToken, refreshToken};
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('User with provided email does not exist');
    }
    const isPasswordValid = await Hash.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    const accessToken = await this.tokenService.generateAccessToken({userId: user.id, email: user.email});
    const refreshToken = await this.tokenService.generateRefreshToken({userId: user.id, email: user.email});
    return {accessToken, refreshToken};
  }
}
