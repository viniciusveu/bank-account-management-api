import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly accountService: AccountService,
  ) {}

  async makeTransaction(transactionData: Transaction): Promise<Transaction> {
    const transaction = new Transaction(transactionData);

    const accountCurrentBalance = await this.accountService.getAccountByNumber(
      transactionData.accountNumber,
    );

    let newBalance =
      accountCurrentBalance.balance + transaction.transactionValue;

    if (newBalance < 0) {
      if (newBalance < -accountCurrentBalance.creditLimit) {
        throw new BadRequestException('Limite de crédito excedido');
      }

      accountCurrentBalance.creditLimit += newBalance;
      newBalance = 0;
    }

    await this.accountService.updateBalance({
      ...accountCurrentBalance,
      balance: newBalance,
    });

    return await this.transactionsRepository.save(transaction);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }
}
