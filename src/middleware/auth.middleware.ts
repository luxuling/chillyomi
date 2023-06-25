import { RegisterBodyRequest } from '@interface/auth.interface';
import createResponse from '@lib/auth_response';
import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export default class AuthMiddleware {
  // eslint-disable-next-line consistent-return
  static async userRegisterFormat(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data: RegisterBodyRequest = await req.body;
    if (
      data.email === undefined ||
      data.username === undefined ||
      data.password === undefined
    ) {
      const response = createResponse({
        status: 403,
        message: 'Data is null or empty',
        data: null,
      });
      res.status(response.status);
      res.send(response);
      return console.log(chalk.red('Request data is null or empty'));
    }
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
