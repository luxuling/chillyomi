import AuthController from '@controller/auth';
import AuthMiddleware from '@middleware/auth.middleware';
import { Router } from 'express';

const router = Router();
router.get('/', AuthController.hello);
router.post(
  '/auth/register',
  AuthMiddleware.userRegisterFormat,
  AuthController.register
);
router.post('/auth/login', AuthController.login);

export default router;
