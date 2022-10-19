import Redis from 'ioredis';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

export type RedisModuleOptions = {
  port: number;
  host: string;
  username?: string;
  password?: string;
  db?: number; // Defaults to 0
};

export const REDIS_TOKEN = 'REDIS';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    const redis = new Redis(options);
    const redisProvider: Provider = {
      provide: REDIS_TOKEN,
      useValue: redis,
    };
    return {
      module: RedisModule,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
