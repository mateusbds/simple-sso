export abstract class SignOut {
  abstract handle(refreshToken: string): Promise<void>;
}

export const signOutToken = 'SignOut';
