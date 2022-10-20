import {
  Inject,
  Injectable,
  Provider,
  UnauthorizedException,
} from '@nestjs/common';

import {
  AccessTokenIssuer,
  AccessTokenIssuerParams,
  accessTokenIssuerToken,
} from '@domain/useCases/AccessTokenIssuer';
import {
  TokenVerifier,
  tokenVerifierToken,
} from '@application/contracts/encryption/TokenVerifier';
import {
  TokenEncrypter,
  tokenEncrypterToken,
} from '@application/contracts/encryption/TokenEncrypter';
import {
  FindTokenByAccountIdRepository,
  findTokenByAccountIdRepositoryToken,
} from '@application/contracts/database/repositories/FindTokenByAccountId';
import {
  FileReader,
  fileReaderToken,
} from '@application/contracts/file/FileReader';
import { TokenPayload } from '@domain/entities/TokenPayload';
import {
  RemoveTokenByAccountIdRepository,
  removeTokenByAccountIdRepositoryToken,
} from '@application/contracts/database/repositories/RemoveTokenByAccountIdRepository';
import {
  TokenDecoder,
  tokenDecoderToken,
} from '@application/contracts/encryption/TokenDecoder';

@Injectable()
export class RedisAccessTokenIssuer implements AccessTokenIssuer {
  constructor(
    @Inject(tokenVerifierToken) private readonly tokenVerifier: TokenVerifier,
    @Inject(tokenDecoderToken) private readonly tokenDecoder: TokenDecoder,
    @Inject(tokenEncrypterToken)
    private readonly tokenEncrypter: TokenEncrypter,
    @Inject(findTokenByAccountIdRepositoryToken)
    private readonly findTokenByAccountIdRepository: FindTokenByAccountIdRepository,
    @Inject(removeTokenByAccountIdRepositoryToken)
    private readonly removeTokenByAccountIdRepository: RemoveTokenByAccountIdRepository,
    @Inject(fileReaderToken)
    private readonly fileReader: FileReader,
  ) {}

  async handle(params: AccessTokenIssuerParams): Promise<string> {
    const { refreshToken } = params;
    const secretOrPrivateKey = await this.fileReader.readFile({
      pathToFile: './keys/jwtRS256.key',
    });
    try {
      const payload = await this.tokenVerifier.verify<TokenPayload>({
        token: refreshToken,
        secretOrKey: secretOrPrivateKey,
        algorithm: 'RS256',
      });
      const token = await this.findTokenByAccountIdRepository.findByAccountId(
        payload.accountId,
      );
      if (!token) {
        throw new Error('Token not found in cache');
      }
      const accessToken = await this.tokenEncrypter.sign<TokenPayload>({
        payload: {
          accountId: payload.accountId,
        },
        secretOrPrivateKey,
        options: {
          expiresIn: '1m',
          algorithm: 'RS256',
        },
      });
      return accessToken;
    } catch (error) {
      console.log(error);
      const payload = await this.tokenDecoder.decode<TokenPayload>({
        token: refreshToken,
      });
      await this.removeTokenByAccountIdRepository.removeTokenByAccountId(
        payload.accountId,
      );
      // Throw unauthorized if token expired/is not valid or not found in cache
      throw new UnauthorizedException();
    }
  }
}

export const redisAccessTokenIssuerProvider: Provider[] = [
  {
    provide: accessTokenIssuerToken,
    useClass: RedisAccessTokenIssuer,
  },
];
