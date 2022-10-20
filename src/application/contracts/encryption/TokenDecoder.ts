export abstract class TokenDecoder {
  abstract decode<T>(params: TokenDecoderParams): Promise<T>;
}

export const tokenDecoderToken = 'TokenDecoder';

export type TokenDecoderParams = {
  token: string;
  secretOrKey: string | Buffer;
};
