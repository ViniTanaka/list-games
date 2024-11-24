import { HttpException, Injectable } from '@nestjs/common';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { User } from '../users/entities/user.entity';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly manager: EntityManager,
    private jwtService: JwtService,
  ) {}
  async validateUser(userName: string, password: string) {
    try {
      console.log(userName, password);
      const user = await this.manager.findOne(User, { where: { userName } });
      const isMatch = await compare(password, user.password);
      if (user && isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async createAccesToken(user: User) {
    return await this.jwtService.sign(
      { user },
      {
        expiresIn: '1d',
      },
    );
  }

  async login(userWithoutPswd: Partial<User>) {
    const payload = {
      user: userWithoutPswd,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      }),
    };
  }
  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
