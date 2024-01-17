import { Account } from 'src/account/account.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  accountNumber: string;

  @Column()
  transactionValue: number;

  @Column()
  transactionType?: string;

  @Column({ default: new Date() })
  transactionDate?: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  constructor(partial: Partial<Transaction>) {
    this.transactionType = partial?.transactionValue < 0 ? 'debito' : 'credito';
    Object.assign(this, partial);
  }
}
