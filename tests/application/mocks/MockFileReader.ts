import { Injectable, Provider } from '@nestjs/common';

import {
  FileReader,
  FileReaderParams,
  fileReaderToken,
} from '@application/contracts/file/FileReader';

@Injectable()
export class MockFileReader implements FileReader {
  async readFile(params: FileReaderParams): Promise<Buffer> {
    return Buffer.from('File content');
  }
}

export const mockFileReaderProvider: Provider[] = [
  {
    provide: fileReaderToken,
    useClass: MockFileReader,
  },
];
