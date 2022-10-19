import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/InfraModule';
import { dbSignUpProvider } from '@application/useCases/DbSignUp';

@Module({
  imports: [InfraModule],
  providers: [...dbSignUpProvider],
  exports: [...dbSignUpProvider],
})
export class SignUpModule {}
