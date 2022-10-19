import fs from 'fs';
import { Injectable, Provider } from '@nestjs/common';

import {
  FileReader,
  FileReaderParams,
  fileReaderToken,
} from '@application/contracts/file/FileReader';

@Injectable()
export class LocalFileReader implements FileReader {
  async readFile(params: FileReaderParams): Promise<Buffer> {
    const { pathToFile } = params;
    return new Promise<Buffer>((resolve, reject) => {
      const rs = fs.createReadStream(pathToFile);
      const chunks: Buffer[] = [];
      rs.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
      rs.on('error', () => {
        reject('Failed to read file');
      });
      rs.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  }
}

export const localFileReaderProvider: Provider[] = [
  {
    provide: fileReaderToken,
    useClass: LocalFileReader,
  },
];
