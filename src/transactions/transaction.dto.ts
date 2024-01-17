import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsNumber()
  @IsNotEmpty()
  transactionValue: number;
}
