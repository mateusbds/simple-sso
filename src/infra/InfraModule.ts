import path from 'path';

import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { tokenAdapterProvider } from './encryption/TokenAdapter';
import { bcryptAdapterProvider } from './encryption/BcryptAdapter';
import { accountRepositoryProvider } from './database/typeorm/repositories/AccountRepository';
import { localFileReaderProvider } from './file/LocalFileReader';
import { AccountEntity } from './database/typeorm/entities/AccountEntity';
import { RedisModule } from './database/redis/RedisModule';
import { tokenRepositoryProvider } from './database/redis/repositories/TokenRepository';

const providers: Provider[] = [
  // File
  ...localFileReaderProvider,

  // Encryption
  ...tokenAdapterProvider,
  ...bcryptAdapterProvider,

  // Repositories Redis,
  ...tokenRepositoryProvider,

  // Repositories Typeorm
  ...accountRepositoryProvider,
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(__dirname, './graphql/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['./dist/src/infra/database/typeorm/entities/**/*.js'],
      subscribers: ['./dist/src/infra/database/typeorm/subscribers/**/*.js'],
    }),
    TypeOrmModule.forFeature([AccountEntity]),
    RedisModule.forRoot({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class InfraModule {}
