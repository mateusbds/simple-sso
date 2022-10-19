export abstract class AddTokenRepository {
  abstract add(params: AddTokenRepositoryParams): Promise<void>;
}

export const addTokenRepositoryToken = 'AddTokenRepository';

export type AddTokenRepositoryParams = {
  accountId: string;
  value: string;
  expiresIn: string;
};
