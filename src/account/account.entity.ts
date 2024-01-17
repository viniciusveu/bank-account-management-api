// account.entity.ts
import { Transaction } from 'src/transactions/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  accountNumber: string;

  @Column({ default: 0 })
  balance: number;

  @Column()
  clientName: string;

  @Column()
  clientDocument: string;

  @Column({ default: 50 })
  creditLimit?: number;

  // @Column({ default: 50 })
  // creditLimitAvailable?: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions?: Transaction[];
}
