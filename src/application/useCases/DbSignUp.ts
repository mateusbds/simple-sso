import {
  ConflictException,
  Inject,
  Injectable,
  Provider,
  UnprocessableEntityException,
} from '@nestjs/common';

import { SignUp, SignUpParams, signUpToken } from '@domain/useCases/SignUp';
import { Hasher, hasherToken } from '@application/contracts/encryption/Hasher';
import {
  CreateAccountRepository,
  createAccountRepositoryToken,
} from '@application/contracts/database/repositories/CreateAccountRepository';
import {
  FindAccountByEmailRepository,
  findAccountByEmailRepositoryToken,
} from '@application/contracts/database/repositories/FindAccountRepository';

@Injectable()
export class DbSignUp implements SignUp {
  constructor(
    @Inject(hasherToken) private readonly hasher: Hasher,
    @Inject(createAccountRepositoryToken)
    private readonly createAccountRepository: CreateAccountRepository,
    @Inject(findAccountByEmailRepositoryToken)
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
  ) {}

  async handle(params: SignUpParams): Promise<void> {
    const { email, password } = params;
    if (!password) {
      throw new UnprocessableEntityException({
        password: 'You must provide a password.',
      });
    }
    const hasAccount = await this.findAccountByEmailRepository.findByEmail(
      email,
    );
    if (hasAccount) {
      throw new ConflictException('Account already exists');
    }
    const hashedPassword = await this.hasher.hash(password);
    await this.createAccountRepository.create({
      email,
      password: hashedPassword,
    });
  }
}

export const dbSignUpProvider: Provider[] = [
  {
    provide: signUpToken,
    useClass: DbSignUp,
  },
];
