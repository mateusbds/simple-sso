import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/InfraModule';
import { dbSignInProvider } from '@application/useCases/DbSignIn';

@Module({
  imports: [InfraModule],
  providers: [...dbSignInProvider],
  exports: [...dbSignInProvider],
})
export class SignInModule {}
