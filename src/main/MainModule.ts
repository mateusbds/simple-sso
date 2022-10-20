import { Module } from '@nestjs/common';

import { SignInMutationModule } from './modules/presentation/mutations/SignInMutationModule';
import { SignUpMutationModule } from './modules/presentation/mutations/SignUpMutationModule';
import { AccessTokenIssuerMutationModule } from './modules/presentation/mutations/AccessTokenIssuerMutationModule';
import { SignOutMutationModule } from './modules/presentation/mutations/SIgnOutMutationModule';

@Module({
  // Mutations
  imports: [
    SignInMutationModule,
    SignUpMutationModule,
    AccessTokenIssuerMutationModule,
    SignOutMutationModule,
  ],
})
export class MainModule {}
