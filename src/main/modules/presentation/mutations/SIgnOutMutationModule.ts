import { Module } from '@nestjs/common';

import { SignOutModule } from '@main/modules/application/SignOutModule';
import { SignOutMutation } from '@presentation/graphql/mutations/SignOutMutation';

@Module({
  imports: [SignOutModule],
  providers: [SignOutMutation],
})
export class SignOutMutationModule {}
