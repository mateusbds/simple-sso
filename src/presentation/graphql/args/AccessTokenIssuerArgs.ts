import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AccessTokenIssuerArgs {
  @IsNotEmpty()
  @Field()
  refreshToken: string;
}
