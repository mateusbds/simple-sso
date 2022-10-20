import path from 'path';

import { Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaService } from './database/prisma/PrismaService';
import { tokenAdapterProvider } from './encryption/TokenAdapter';
import { bcryptAdapterProvider } from './encryption/BcryptAdapter';
import { localFileReaderProvider } from './file/LocalFileReader';
import { RedisModule } from './database/redis/RedisModule';
import { tokenRepositoryProvider } from './database/redis/repositories/TokenRepository';
import { accountRepositoryProvider } from './database/prisma/repositories/AccountRepositor';

const providers: Provider[] = [
  // File
  ...localFileReaderProvider,

  // Encryption
  ...tokenAdapterProvider,
  ...bcryptAdapterProvider,

  // Repositories Redis,
  ...tokenRepositoryProvider,

  // Repositories Prisma
  ...accountRepositoryProvider,
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(__dirname, './graphql/schema.gql'),
    }),
    RedisModule.forRoot({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    }),
  ],
  providers: [PrismaService, ...providers],
  exports: [PrismaService, ...providers],
})
export class InfraModule {}
