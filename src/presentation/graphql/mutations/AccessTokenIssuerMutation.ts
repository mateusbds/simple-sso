import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  AccessTokenIssuer,
  accessTokenIssuerToken,
} from '@domain/useCases/AccessTokenIssuer';

import { AccessTokenIssuerArgs } from '../args/AccessTokenIssuerArgs';

@Resolver()
export class AccessTokenIssuerMutation {
  constructor(
    @Inject(accessTokenIssuerToken)
    private readonly accessTokenIssuer: AccessTokenIssuer,
  ) {}

  @Mutation(() => String)
  async issueToken(@Args() accessTokenIssuerArgs: AccessTokenIssuerArgs) {
    const { refreshToken } = accessTokenIssuerArgs;
    return this.accessTokenIssuer.handle({
      refreshToken,
    });
  }
}
