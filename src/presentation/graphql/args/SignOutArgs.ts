import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class SignOutArgs {
  @Field()
  @IsNotEmpty()
  refreshToken: string;
}
