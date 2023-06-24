import { AuthResponseBody } from '@interface/auth.interface';
import AuthService from '@service/auth.service';
import { Request, Response } from 'express';

class AuthController {
  static hello(req: Request, res: Response) {
    res.send('nonton API is Running');
  }

  static async register(req: Request, res: Response) {
    const response = await AuthService.register(req.body);
    res.status(response.status);
    res.send(response);
  }

  static async login(req: Request, res: Response) {
    const response: AuthResponseBody = await AuthService.login(req.body);
    res.status(response.status);
    res.send(response);
  }
}

export default AuthController;
