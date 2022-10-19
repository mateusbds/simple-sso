import { Module } from '@nestjs/common';

import { SignInModule } from '@main/modules/application/SignInModule';
import { SignInMutation } from '@presentation/graphql/mutations/SignInMutation';

@Module({
  imports: [SignInModule],
  providers: [SignInMutation],
})
export class SignInMutationModule {}
