import { Inject, Injectable, Provider } from '@nestjs/common';

import { SignOut, signOutToken } from '@domain/useCases/SignOut';
import {
  RemoveTokenByAccountIdRepository,
  removeTokenByAccountIdRepositoryToken,
} from '@application/contracts/database/repositories/RemoveTokenByAccountIdRepository';
import {
  TokenDecoder,
  tokenDecoderToken,
} from '@application/contracts/encryption/TokenDecoder';
import { TokenPayload } from '@domain/entities/TokenPayload';

@Injectable()
export class DbSignOut implements SignOut {
  constructor(
    @Inject(removeTokenByAccountIdRepositoryToken)
    private readonly removeTokenByAccountIdRepository: RemoveTokenByAccountIdRepository,
    @Inject(tokenDecoderToken)
    private readonly tokenDecoder: TokenDecoder,
  ) {}

  async handle(refreshToken: string): Promise<void> {
    const payload = await this.tokenDecoder.decode<TokenPayload>({
      token: refreshToken,
    });
    await this.removeTokenByAccountIdRepository.removeTokenByAccountId(
      payload.accountId,
    );
  }
}

export const dbSignOutProvider: Provider[] = [
  {
    provide: signOutToken,
    useClass: DbSignOut,
  },
];
