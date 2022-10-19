import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { SignIn, signInToken } from '@domain/useCases/SignIn';

import { SignInResponse } from '../typeDefs/responses/SignInResponse';
import { SignInArgs } from '../args/SignInArgs';
import { PingPong } from '../typeDefs/responses/PingPongResponse';

@Resolver()
export class SignInMutation {
  constructor(@Inject(signInToken) private readonly signInUseCase: SignIn) {}

  @Query(() => PingPong)
  root() {
    return {
      ping: 'test',
    };
  }

  @Mutation(() => SignInResponse)
  async signIn(@Args() signInArgs: SignInArgs) {
    return this.signInUseCase.handle(signInArgs);
  }
}
