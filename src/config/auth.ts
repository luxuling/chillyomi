import Env from '@lib/setup_env';
import { Algorithm } from 'jsonwebtoken';

Env.set();

interface AuthConfig {
  SECRET: string;
  EXPIRED: string;
  ROUND: number;
  ALGORITHM: Algorithm;
}

const authConfig: AuthConfig = {
  SECRET: process.env.AUTH_SECRET as string,
  EXPIRED: process.env.AUTH_EXPIRED as string,
  ROUND: Number(process.env.AUTH_ROUND),
  ALGORITHM: process.env.AUTH_ALGORITHM as Algorithm,
};

export default authConfig;
