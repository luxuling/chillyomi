import authConfig from '@config/auth';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  AuthResponseBody,
  LoginBodyRequest,
  RegisterBodyRequest,
} from '@interface/auth.interface';
import { Prisma, PrismaClient } from '@prisma/client';
import createResponse from '@lib/auth_response';

class AuthService {
  static prisma = new PrismaClient();

  private static readonly secret: string = authConfig.SECRET;

  private static readonly round: number = authConfig.ROUND;

  private static readonly defaultJwtOptions: SignOptions = {
    algorithm: authConfig.ALGORITHM,
    expiresIn: authConfig.EXPIRED,
  };

  static hash(data: string | Buffer) {
    const salt = bcrypt.genSaltSync(this.round);
    return bcrypt.hash(data, salt);
  }

  static compare(plainPassword: string | Buffer, encrypted: string) {
    return bcrypt.compareSync(plainPassword, encrypted);
  }

  static tokenize(data: string | object) {
    return jwt.sign(data, this.secret, this.defaultJwtOptions);
  }

  static jwtVerify(data: string) {
    return jwt.verify(data, this.secret);
  }

  static async register(body: RegisterBodyRequest): Promise<AuthResponseBody> {
    const encrypted = await this.hash(body.password);
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          name: body.username,
          email: body.email,
          password: encrypted,
        },
      });

      return createResponse({
        status: 200,
        message: 'User succesfully created',
        data: userCreated,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          switch (error.meta as any) {
            case 'User_email_key':
              return createResponse({
                status: 403,
                message: 'Duplicate email address',
                data: null,
              });
            default:
              return createResponse({
                status: 403,
                message: 'Duplicate username address',
                data: null,
              });
          }
        }
      }
      return createResponse({
        status: 403,
        message: error as string,
        data: null,
      });
    } finally {
      this.prisma.$disconnect();
    }
  }

  static async login(body: LoginBodyRequest): Promise<AuthResponseBody> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: body.email },
      });
      if (!user) {
        return createResponse({
          status: 404,
          message: 'User not found',
          data: user,
        });
      }
      const isPasswordMatch = this.compare(body.password, user.password);
      if (isPasswordMatch) {
        return createResponse({
          status: 200,
          message: 'Succesfully login',
          data: user,
        });
      }

      return createResponse({
        status: 401,
        message: 'Password not match',
        data: null,
      });
    } catch (error: any) {
      return createResponse({
        status: 400,
        message: error.message,
        data: null,
      });
    } finally {
      this.prisma.$disconnect();
    }
  }
}

export default AuthService;
