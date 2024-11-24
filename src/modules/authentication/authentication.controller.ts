import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UsersService } from './../users/users.service';
import { User } from '../users/entities/user.entity';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private UsersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const userWithoutPswd: Partial<User> = req.user;
    return this.authenticationService.login(userWithoutPswd);
  }

  @Get()
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
