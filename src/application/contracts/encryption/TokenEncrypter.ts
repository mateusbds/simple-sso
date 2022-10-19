export abstract class TokenEncrypter {
  abstract sign(params: TokenEncrypterParams): Promise<string>;
}

export const tokenEncrypterToken = 'TokenEncrypter';

export type TokenEncrypterOptions = {
  expiresIn?: string;
  algorithm?: 'RS256';
};

export type TokenEncrypterParams<T = Record<string, unknown>> = {
  payload: T;
  secretOrPrivateKey: string | Buffer;
  options?: TokenEncrypterOptions;
};
