import bcrypt from 'bcrypt';
import { Injectable, Provider } from '@nestjs/common';

import {
  HashComparer,
  hashComparerToken,
} from '@application/contracts/encryption/HashComparer';
import { Hasher, hasherToken } from '@application/contracts/encryption/Hasher';

@Injectable()
export class BcryptAdapter implements HashComparer, Hasher {
  compare(hashed: string, toCompare: string): Promise<boolean> {
    return bcrypt.compare(toCompare, hashed);
  }

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }
}

export const bcryptAdapterProvider: Provider[] = [
  {
    provide: hashComparerToken,
    useClass: BcryptAdapter,
  },
  {
    provide: hasherToken,
    useClass: BcryptAdapter,
  },
];
