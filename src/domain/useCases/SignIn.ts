export abstract class SignIn {
  abstract handle(params: SignInParams): Promise<SignInResult>;
}

export const signInToken = 'SignIn';

export type SignInParams = {
  email: string;
  password?: string;
};

export type SignInResult = {
  refreshToken: string;
  accessToken: string;
};
