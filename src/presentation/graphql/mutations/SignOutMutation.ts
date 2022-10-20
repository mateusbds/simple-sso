import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignOut, signOutToken } from '@domain/useCases/SignOut';

import { SignOutArgs } from '../args/SignOutArgs';

@Resolver()
export class SignOutMutation {
  constructor(@Inject(signOutToken) private readonly signOutUseCase: SignOut) {}

  @Mutation(() => Boolean)
  async signOut(@Args() signOutArgs: SignOutArgs) {
    const { refreshToken } = signOutArgs;
    await this.signOutUseCase.handle(refreshToken);
    return true;
  }
}
