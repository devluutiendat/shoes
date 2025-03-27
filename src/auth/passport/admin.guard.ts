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
        'Access denied. Email does not match the required criteria.',
      );
    }

    return true;
  }
}
