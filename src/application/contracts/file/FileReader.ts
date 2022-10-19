export abstract class FileReader {
  abstract readFile(params: FileReaderParams): Promise<Buffer>;
}

export const fileReaderToken = 'FileReader';

export type FileReaderParams = {
  pathToFile: string;
};
