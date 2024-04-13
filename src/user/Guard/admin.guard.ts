import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role; // Assuming the role is stored in the user object

    if (userRole === 'admin') {
      return true;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }
}
