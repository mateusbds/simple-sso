import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/InfraModule';
import { dbSignOutProvider } from '@application/useCases/DbSignOut';

@Module({
  imports: [InfraModule],
  providers: [...dbSignOutProvider],
  exports: [...dbSignOutProvider],
})
export class SignOutModule {}
