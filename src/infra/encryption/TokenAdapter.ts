import jwt from 'jsonwebtoken';
import { Injectable, Provider } from '@nestjs/common';

import {
  TokenEncrypter,
  TokenEncrypterParams,
  tokenEncrypterToken,
} from '@application/contracts/encryption/TokenEncrypter';

@Injectable()
export class TokenAdapter implements TokenEncrypter {
  async sign(params: TokenEncrypterParams): Promise<string> {
    const { payload, secretOrPrivateKey, options } = params;
    return jwt.sign(payload, secretOrPrivateKey, options);
  }
}

export const tokenAdapterProvider: Provider[] = [
  {
    provide: tokenEncrypterToken,
    useClass: TokenAdapter,
  },
];
