import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Length,
  IsOptional,
} from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  clientDocument: string;

  @IsNumber()
  @IsOptional()
  balance: number;

  @IsNumber()
  @IsOptional()
  creditLimit?: number;
}
