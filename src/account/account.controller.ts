// account.controller.ts
import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './account.dto';
import { Account } from './account.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Get(':accountNumber')
  async getAccountInfo(
    @Param('accountNumber') accountNumber: string,
  ): Promise<Account> {
    const account = await this.accountService.getAccountByNumber(accountNumber);

    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
      clientName: account.clientName,
      clientDocument: account.clientDocument,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllAccounts(): Promise<Account[]> {
    const accounts = await this.accountService.getAllAccounts();

    return accounts;
  }

  @UseGuards(AuthGuard)
  @Post()
  async createAccount(@Body() accountData: AccountDto): Promise<Account> {
    const account = await this.accountService.createAccount(
      accountData as Account,
    );

    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
      clientName: account.clientName,
      clientDocument: account.clientDocument,
    };
  }
}
