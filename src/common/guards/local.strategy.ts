import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });
  }

  async validate(userName: string, password: string): Promise<Partial<User>> {
    const userWithoutPsw = await this.authenticationService.validateUser(
      userName,
      password,
    );
    if (!userWithoutPsw) {
      throw new UnauthorizedException('Invalid userName or password');
    }
    return userWithoutPsw;
  }
}
