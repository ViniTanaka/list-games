import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './database.providers';
import { User } from 'src/modules/users/entities/user.entity';
import { Game } from 'src/modules/games/entities/game.entity';
import { Type } from '../entities/type.entity';
import { Category } from '../entities/category.entity';
import { Materials } from '../entities/materials.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [User, Game, Type, Category, Materials],
      schema: 'public',
      logging: 'all',
      synchronize: false,
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
