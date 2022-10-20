export abstract class TokenEncrypter {
  abstract sign<T = Record<string, unknown>>(
    params: TokenEncrypterParams<T>,
  ): Promise<string>;
}

export const tokenEncrypterToken = 'TokenEncrypter';

export type TokenEncrypterOptions = {
  expiresIn?: string;
  algorithm?: 'RS256';
};

export type TokenEncrypterParams<T> = {
  payload: T;
  secretOrPrivateKey: string | Buffer;
  options?: TokenEncrypterOptions;
};
