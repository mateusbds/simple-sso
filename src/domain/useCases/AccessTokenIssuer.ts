export abstract class AccessTokenIssuer {
  abstract handle(params: AccessTokenIssuerParams): Promise<string>;
}

export const accessTokenIssuerToken = 'AccessTokenIssuer';

export type AccessTokenIssuerParams = {
  refreshToken: string;
};
