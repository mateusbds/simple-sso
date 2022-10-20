import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/InfraModule';
import { redisAccessTokenIssuerProvider } from '@application/useCases/RedisAccessTokenIssuer';

@Module({
  imports: [InfraModule],
  providers: [...redisAccessTokenIssuerProvider],
  exports: [...redisAccessTokenIssuerProvider],
})
export class AccessTokenIssuerModule {}
