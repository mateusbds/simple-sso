export abstract class SignUp {
  abstract handle(params: SignUpParams): Promise<void>;
}

export const signUpToken = 'SignUp';

export type SignUpParams = {
  email: string;
  password?: string;
};
