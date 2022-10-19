import { Test } from '@nestjs/testing';

import { DbSignIn } from '@application/useCases/DbSignIn';
import { account } from '@tests/domain/mocks/account';
import {
  FindAccountByEmailRepository,
  findAccountByEmailRepositoryToken,
} from '@application/contracts/database/repositories/FindAccountRepository';
import {
  HashComparer,
  hashComparerToken,
} from '@application/contracts/encryption/HashComparer';
import {
  FileReader,
  fileReaderToken,
} from '@application/contracts/file/FileReader';
import {
  TokenEncrypter,
  tokenEncrypterToken,
} from '@application/contracts/encryption/TokenEncrypter';

import { mockFindAccountByEmailRepositoryProvider } from '../mocks/MockFindAccountByEmailRepository';
import { mockHashComparer } from '../mocks/MockHashComparer';
import { mockFileReaderProvider } from '../mocks/MockFileReader';
import { mockTokenEncrypterProvider } from '../mocks/MockTokenEncrypter';

describe('DbSignIn', () => {
  let sut: DbSignIn;
  let findAccountByEmailRepository: FindAccountByEmailRepository;
  let hashComparer: HashComparer;
  let tokenEncrypter: TokenEncrypter;
  let fileReader: FileReader;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DbSignIn,
        ...mockFindAccountByEmailRepositoryProvider,
        ...mockHashComparer,
        ...mockFileReaderProvider,
        ...mockTokenEncrypterProvider,
      ],
    }).compile();

    sut = moduleRef.get(DbSignIn);
    findAccountByEmailRepository = moduleRef.get<FindAccountByEmailRepository>(
      findAccountByEmailRepositoryToken,
    );
    hashComparer = moduleRef.get<HashComparer>(hashComparerToken);
    tokenEncrypter = moduleRef.get<TokenEncrypter>(tokenEncrypterToken);
    fileReader = moduleRef.get<FileReader>(fileReaderToken);
  });

  test('Should return a refresh and an access token', async () => {
    const findAccountByEmailRepositorySpyOn = jest.spyOn(
      findAccountByEmailRepository,
      'findByEmail',
    );
    const hashComparerSpyOn = jest.spyOn(hashComparer, 'compare');
    const tokenEncrypterSpyOn = jest.spyOn(tokenEncrypter, 'sign');
    const fileReaderSpyOn = jest.spyOn(fileReader, 'readFile');

    const result = await sut.handle({
      email: account.email,
      password: account.password,
    });

    expect(findAccountByEmailRepositorySpyOn).toHaveBeenCalledWith(
      account.email,
    );
    expect(hashComparerSpyOn).toHaveBeenCalledWith(
      account.password,
      account.password,
    );
    expect(fileReaderSpyOn).toHaveBeenCalled();
    expect(tokenEncrypterSpyOn).toHaveBeenCalledTimes(2);
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });
});
