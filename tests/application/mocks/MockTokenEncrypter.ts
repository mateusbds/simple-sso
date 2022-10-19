import { Injectable, Provider } from '@nestjs/common';

import {
  TokenEncrypter,
  TokenEncrypterParams,
  tokenEncrypterToken,
} from '@application/contracts/encryption/TokenEncrypter';

@Injectable()
export class MockTokenEncrypter implements TokenEncrypter {
  async sign(params: TokenEncrypterParams<unknown>): Promise<string> {
    return 'hashed_token';
  }
}

export const mockTokenEncrypterProvider: Provider[] = [
  {
    provide: tokenEncrypterToken,
    useClass: MockTokenEncrypter,
  },
];
