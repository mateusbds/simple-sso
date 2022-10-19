import { Module } from '@nestjs/common';

import { SignUpModule } from '@main/modules/application/SignUpModule';
import { SignUpMutation } from '@presentation/graphql/mutations/SignUpMutation';

@Module({
  imports: [SignUpModule],
  providers: [SignUpMutation],
})
export class SignUpMutationModule {}
