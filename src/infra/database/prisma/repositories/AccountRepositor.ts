import { Injectable, Provider } from '@nestjs/common';

import {
  CreateAccountRepository,
  CreateAccountRepositoryParams,
  createAccountRepositoryToken,
} from '@application/contracts/database/repositories/CreateAccountRepository';
import {
  FindAccountByEmailRepository,
  findAccountByEmailRepositoryToken,
} from '@application/contracts/database/repositories/FindAccountRepository';
import { Account } from '@domain/entities/Account';

import { PrismaService } from '../PrismaService';

@Injectable()
export class AccountRepository
  implements FindAccountByEmailRepository, CreateAccountRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<Account> {
    const data = await this.prismaService.account.findUnique({
      where: { email },
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
    const data = await this.prismaService.account.create({
      data: {
        email,
        password,
      },
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
    return {
      id: data.id,
      email: data.email,
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
