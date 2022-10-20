export abstract class TokenVerifier {
  abstract verify<T>(params: TokenVerifierParams): Promise<T>;
}

export const tokenVerifierToken = 'TokenVerifier';

export type TokenVerifierParams = {
  token: string;
  secretOrKey: string | Buffer;
  algorithm: 'RS256';
};
