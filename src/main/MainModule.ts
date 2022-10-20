import { Module } from '@nestjs/common';

import { SignInMutationModule } from './modules/presentation/mutations/SignInMutationModule';
import { SignUpMutationModule } from './modules/presentation/mutations/SignUpMutationModule';
import { AccessTokenIssuerMutationModule } from './modules/presentation/mutations/AccessTokenIssuerModule';

@Module({
  // Mutations
  imports: [
    SignInMutationModule,
    SignUpMutationModule,
    AccessTokenIssuerMutationModule,
  ],
})
export class MainModule {}
