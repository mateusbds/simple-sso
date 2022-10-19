import { Injectable, Provider } from '@nestjs/common';

import {
  HashComparer,
  hashComparerToken,
} from '@application/contracts/encryption/HashComparer';

@Injectable()
export class MockHashComparer implements HashComparer {
  async compare(hashed: string, toCompare: string): Promise<boolean> {
    return hashed === toCompare;
  }
}

export const mockHashComparer: Provider[] = [
  {
    provide: hashComparerToken,
    useClass: MockHashComparer,
  },
];
