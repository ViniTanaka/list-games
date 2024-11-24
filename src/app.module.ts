import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    GamesModule,
    AuthenticationModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
})
export class AppModule {}
