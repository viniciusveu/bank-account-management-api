import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DB_PORT || 5432,
      host: process.env.DB_HOST || 'postgres_bank',
      username: process.env.DB_USER || 'user_bank',
      password: process.env.DB_PASSWORD || 'pwd_bank',
      database: process.env.DB_DATABASE || 'mydb_bank',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      //migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      synchronize: true,
    }),
    AccountModule,
    TransactionsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
