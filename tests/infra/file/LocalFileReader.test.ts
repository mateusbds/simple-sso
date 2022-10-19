import { Test } from '@nestjs/testing';

import { LocalFileReader } from '@infra/file/LocalFileReader';

describe('LocalFileReader', () => {
  let sut: LocalFileReader;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LocalFileReader],
    }).compile();

    sut = moduleRef.get(LocalFileReader);
  });

  test('Should return the content of a file as Buffer', async () => {
    const content = await sut.readFile({
      pathToFile: './keys/jwtRS256.key',
    });
    expect(content).toBeInstanceOf(Buffer);
  });
});
