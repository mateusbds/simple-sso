import Redis from 'ioredis';
import { Inject, Injectable, Provider } from '@nestjs/common';
import ms from 'ms';

import {
  AddTokenRepository,
  AddTokenRepositoryParams,
  addTokenRepositoryToken,
} from '@application/contracts/database/repositories/AddTokenRepository';

import {
  FindTokenByAccountIdRepository,
  findTokenByAccountIdRepositoryToken,
} from '@application/contracts/database/repositories/FindTokenByAccountId';
import {
  RemoveTokenByAccountIdRepository,
  removeTokenByAccountIdRepositoryToken,
} from '@application/contracts/database/repositories/RemoveTokenByAccountIdRepository';

import { REDIS_TOKEN } from '../RedisModule';

@Injectable()
export class TokenRepository
  implements
    AddTokenRepository,
    FindTokenByAccountIdRepository,
    RemoveTokenByAccountIdRepository
{
  constructor(@Inject(REDIS_TOKEN) private readonly redis: Redis) {}

  async add(params: AddTokenRepositoryParams): Promise<void> {
    const { accountId, expiresIn, value } = params;
    const seconds = ms(expiresIn) / 1000;
    await this.redis.set(accountId, value);
    await this.redis.expire(accountId, seconds);
  }

  findByAccountId(accountId: string): Promise<string> {
    return this.redis.get(accountId);
  }

  async removeTokenByAccountId(accountId: string): Promise<void> {
    await this.redis.del(accountId);
  }
}

export const tokenRepositoryProvider: Provider[] = [
  {
    provide: addTokenRepositoryToken,
    useClass: TokenRepository,
  },
  {
    provide: findTokenByAccountIdRepositoryToken,
    useClass: TokenRepository,
  },
  {
    provide: removeTokenByAccountIdRepositoryToken,
    useClass: TokenRepository,
  },
];
