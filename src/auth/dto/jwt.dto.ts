import { IPayloadGenerateToken } from './payload-generate-token.dto';

export interface JwtDto {
  userId: string;
  user?: IPayloadGenerateToken['user'];

  iat: number;

  exp: number;
}
