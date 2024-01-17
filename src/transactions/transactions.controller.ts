import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async makeTransaction(
    @Body() transactionData: TransactionDto,
  ): Promise<Transaction> {
    return await this.transactionsService.makeTransaction(
      transactionData as Transaction,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllTransactions(): Promise<Transaction[]> {
    return await this.transactionsService.getAllTransactions();
  }
}
