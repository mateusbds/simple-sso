import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignUp, signUpToken } from '@domain/useCases/SignUp';

import { SignUpArgs } from '../args/SignUpArgs';

@Resolver()
export class SignUpMutation {
  constructor(@Inject(signUpToken) private readonly signUpUseCase: SignUp) {}

  @Mutation(() => Boolean)
  async signUp(@Args() signUpArgs: SignUpArgs): Promise<boolean> {
    await this.signUpUseCase.handle({
      email: signUpArgs.email,
      password: signUpArgs.password,
    });
    return true;
  }
}
