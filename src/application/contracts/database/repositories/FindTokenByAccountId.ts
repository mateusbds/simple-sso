export abstract class FindTokenByAccountIdRepository {
  abstract findByAccountId(accountId: string): Promise<string>;
}

export const findTokenByAccountIdRepositoryToken =
  'FindTokenByAccountIdRepository';
