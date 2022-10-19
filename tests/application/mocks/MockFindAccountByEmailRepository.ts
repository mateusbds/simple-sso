import { Injectable, Provider } from '@nestjs/common';

import {
  FindAccountByEmailRepository,
  findAccountByEmailRepositoryToken,
} from '@application/contracts/database/repositories/FindAccountRepository';
import { Account } from '@domain/entities/Account';
import { accounts } from '@tests/domain/mocks/account';

@Injectable()
export class MockFindAccountByEmailRepository
  implements FindAccountByEmailRepository
{
  async findByEmail(email: string): Promise<Account> {
    return accounts.find((acc) => acc.email === email);
  }
}

export const mockFindAccountByEmailRepositoryProvider: Provider[] = [
  {
    provide: findAccountByEmailRepositoryToken,
    useClass: MockFindAccountByEmailRepository,
  },
];
