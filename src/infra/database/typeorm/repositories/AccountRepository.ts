import { Repository } from 'typeorm';
import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FindAccountByEmailRepository,
  findAccountByEmailRepositoryToken,
} from '@application/contracts/database/repositories/FindAccountRepository';
import { Account } from '@domain/entities/Account';

import { AccountEntity } from '../entities/AccountEntity';
import {
  CreateAccountRepository,
  CreateAccountRepositoryParams,
  createAccountRepositoryToken,
} from '@application/contracts/database/repositories/CreateAccountRepository';

@Injectable()
export class AccountRepository
  implements FindAccountByEmailRepository, CreateAccountRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountEntityRepository: Repository<AccountEntity>,
  ) {}

  async findByEmail(email: string): Promise<Account> {
    const data = await this.accountEntityRepository.findOne({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });
    if (!data) {
      return undefined;
    }
    return {
      id: data.id,
      email: data.email,
      password: data.password,
    };
  }

  async create(params: CreateAccountRepositoryParams): Promise<Account> {
    const { email, password } = params;
    const account = await this.accountEntityRepository.save({
      email,
      password,
    });
    return {
      id: account.id,
      email: account.email,
    };
  }
}

export const accountRepositoryProvider: Provider[] = [
  {
    provide: findAccountByEmailRepositoryToken,
    useClass: AccountRepository,
  },
  {
    provide: createAccountRepositoryToken,
    useClass: AccountRepository,
  },
];
