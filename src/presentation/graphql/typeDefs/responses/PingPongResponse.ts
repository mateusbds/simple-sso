import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PingPong {
  @Field()
  ping: string;
}
