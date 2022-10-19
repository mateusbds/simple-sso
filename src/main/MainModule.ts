import { Module } from '@nestjs/common';

import { SignInMutationModule } from './modules/presentation/mutations/SignInMutationModule';
import { SignUpMutationModule } from './modules/presentation/mutations/SignUpMutationModule';

@Module({
  // Mutations
  imports: [SignInMutationModule, SignUpMutationModule],
})
export class MainModule {}
