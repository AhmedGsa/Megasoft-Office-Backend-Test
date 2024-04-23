import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { GetCurrentUser } from './decorators/current-user.decorator';
import { UserPayload } from './interfaces/user-payload.interface';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register-user')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('/register-accountant')
  registerAccountant(@Body() registerDto: RegisterDto) {
    return this.authService.registerAccountant(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Get('/refresh')
  refresh(@GetCurrentUser() userPayload: UserPayload) {
    return this.authService.refresh(userPayload.userId);
  }
}
