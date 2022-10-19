export abstract class HashComparer {
  abstract compare(hashed: string, toCompare: string): Promise<boolean>;
}

export const hashComparerToken = 'HashComparer';
