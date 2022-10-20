import {
  Inject,
  Injectable,
  NotFoundException,
  Provider,
  UnauthorizedException,
} from '@nestjs/common';

import {
  SignIn,
  SignInParams,
  SignInResult,
  signInToken,
} from '@domain/useCases/SignIn';
import {
  FindAccountByEmailRepository,
  findAccountByEmailRepositoryToken,
} from '@application/contracts/database/repositories/FindAccountRepository';
import {
  HashComparer,
  hashComparerToken,
} from '@application/contracts/encryption/HashComparer';
import {
  TokenEncrypter,
  tokenEncrypterToken,
} from '@application/contracts/encryption/TokenEncrypter';
import {
  FileReader,
  fileReaderToken,
} from '@application/contracts/file/FileReader';
import {
  AddTokenRepository,
  addTokenRepositoryToken,
} from '@application/contracts/database/repositories/AddTokenRepository';
import { TokenPayload } from '@domain/entities/TokenPayload';

@Injectable()
export class DbSignIn implements SignIn {
  constructor(
    @Inject(findAccountByEmailRepositoryToken)
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    @Inject(addTokenRepositoryToken)
    private readonly addTokenRepository: AddTokenRepository,
    @Inject(hashComparerToken)
    private readonly hashComparer: HashComparer,
    @Inject(tokenEncrypterToken)
    private readonly tokenEncrypter: TokenEncrypter,
    @Inject(fileReaderToken)
    private readonly fileReader: FileReader,
  ) {}

  async handle(params: SignInParams): Promise<SignInResult> {
    const { email, password } = params;
    const account = await this.findAccountByEmailRepository.findByEmail(email);
    if (!account) {
      throw new NotFoundException();
    }
    const isValid = await this.hashComparer.compare(account.password, password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    /**
      ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
      # Don't add passphrase
      openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
    */
    const secretOrPrivateKey = await this.fileReader.readFile({
      pathToFile: './keys/jwtRS256.key',
    });
    const accessToken = await this.tokenEncrypter.sign<TokenPayload>({
      payload: {
        accountId: account.id,
      },
      secretOrPrivateKey,
      options: {
        expiresIn: '1m',
        algorithm: 'RS256',
      },
    });
    const refreshToken = await this.tokenEncrypter.sign<TokenPayload>({
      payload: {
        accountId: account.id,
      },
      secretOrPrivateKey,
      options: {
        expiresIn: '7d',
        algorithm: 'RS256',
      },
    });
    await this.addTokenRepository.add({
      accountId: account.id,
      value: refreshToken,
      expiresIn: '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export const dbSignInProvider: Provider[] = [
  {
    provide: signInToken,
    useClass: DbSignIn,
  },
];
