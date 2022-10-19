import { Account } from '@domain/entities/Account';

export abstract class FindAccountByEmailRepository {
  abstract findByEmail(email: string): Promise<Account>;
}

export const findAccountByEmailRepositoryToken = 'FindAccountByEmailRepository';
