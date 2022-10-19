export abstract class RemoveTokenByAccountIdRepository {
  abstract removeTokenByAccountId(accountId: string): Promise<void>;
}

export const removeTokenByAccountIdRepositoryToken =
  'RemoveTokenByAccountIdRepository';
