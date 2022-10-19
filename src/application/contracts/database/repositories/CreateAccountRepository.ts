import { Account } from '@domain/entities/Account';

export abstract class CreateAccountRepository {
  abstract create(params: CreateAccountRepositoryParams): Promise<Account>;
}

export const createAccountRepositoryToken = 'CreateAccountRepository';

export type CreateAccountRepositoryParams = {
  email: string;
  password?: string;
};
