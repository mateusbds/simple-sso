import jwt from 'jsonwebtoken';
import { Injectable, Provider } from '@nestjs/common';

import {
  TokenEncrypter,
  TokenEncrypterParams,
  tokenEncrypterToken,
} from '@application/contracts/encryption/TokenEncrypter';
import {
  TokenVerifier,
  TokenVerifierParams,
  tokenVerifierToken,
} from '@application/contracts/encryption/TokenVerifier';
import {
  TokenDecoder,
  TokenDecoderParams,
  tokenDecoderToken,
} from '@application/contracts/encryption/TokenDecoder';

@Injectable()
export class TokenAdapter
  implements TokenEncrypter, TokenVerifier, TokenDecoder
{
  async sign<T>(params: TokenEncrypterParams<T>): Promise<string> {
    const { payload, secretOrPrivateKey, options } = params;
    return jwt.sign(payload as object, secretOrPrivateKey, options);
  }

  async verify<T>(params: TokenVerifierParams): Promise<T> {
    const { secretOrKey, token, algorithm } = params;
    const value = jwt.verify(token, secretOrKey, {
      algorithms: [algorithm],
    }) as T;
    return value;
  }

  async decode<T>(params: TokenDecoderParams): Promise<T> {
    const { token } = params;
    const value = jwt.decode(token) as T;
    return value;
  }
}

export const tokenAdapterProvider: Provider[] = [
  {
    provide: tokenEncrypterToken,
    useClass: TokenAdapter,
  },
  {
    provide: tokenVerifierToken,
    useClass: TokenAdapter,
  },
  {
    provide: tokenDecoderToken,
    useClass: TokenAdapter,
  },
];
