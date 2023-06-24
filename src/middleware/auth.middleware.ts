import { RegisterBodyRequest } from '@interface/auth.interface';
import createResponse from '@lib/auth_response';
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export default class AuthMiddleware {
  static async userRegisterFormat(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data: RegisterBodyRequest = await req.body;
    if (!validator.isEmail(data.email)) {
      const response = createResponse({
        status: 403,
        message: 'Please enter a valid email address',
        data: null,
      });
      res.status(response.status);
      res.send(response);
    } else if (data.password.length < 6) {
      const response = createResponse({
        status: 403,
        message: 'Your password is too short, at least 6 characters',
        data: null,
      });
      res.status(response.status);
      res.send(response);
    } else {
      next();
    }
  }
}
