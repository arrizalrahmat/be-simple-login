import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';
export type ParsedJWT = {
  sub: string;
  username: string;
  deleted: boolean;
};

export const parseToken = (token: string) => {
  const parsedToken = jwt.verify(token, jwtConstants.secret) as ParsedJWT;
  return parsedToken;
};
