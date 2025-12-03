import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const email = process.env.EMAIL_ADMIN;
    if (!user || !user.email) {
      throw new ForbiddenException('User or email not found.');
    }

    if (user.email !== email) {
      throw new ForbiddenException(
<<<<<<< HEAD
        'Access denied. Email does not match the required criteria.',
=======
        'Access denied. You must be an admin to perform this action.',
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
      );
    }

    return true;
  }
}
