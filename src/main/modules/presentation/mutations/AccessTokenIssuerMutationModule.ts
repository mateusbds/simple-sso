import { Module } from '@nestjs/common';

import { AccessTokenIssuerModule } from '@main/modules/application/AccessTokenIssuerModule';
import { AccessTokenIssuerMutation } from '@presentation/graphql/mutations/AccessTokenIssuerMutation';

@Module({
  imports: [AccessTokenIssuerModule],
  providers: [AccessTokenIssuerMutation],
})
export class AccessTokenIssuerMutationModule {}
