import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/common/guards/local.strategy';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtStrategy } from 'src/common/guards/jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UsersService,
    JwtService,
    JwtStrategy,
    LocalAuthGuard,
    LocalStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
