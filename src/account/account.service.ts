// account.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async getAccountByNumber(accountNumber: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        accountNumber,
      },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    return account;
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async createAccount(accountData: Account): Promise<Account> {
    const accountExists = await this.accountRepository.findOne({
      where: {
        accountNumber: accountData.accountNumber,
      },
    });

    if (accountExists) {
      throw new ConflictException('Conta já existe');
    }

    const account = this.accountRepository.create(accountData);

    await this.accountRepository.save(account);

    return account;
  }

  async updateBalance(accountData: Account): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        accountNumber: accountData.accountNumber,
      },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    account.balance = accountData.balance;

    await this.accountRepository.save(account);

    return account;
  }
}
