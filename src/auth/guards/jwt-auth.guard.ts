import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('JwtAuthGuard - Headers:', request.headers);
    console.log('JwtAuthGuard - Authorization:', request.headers.authorization);
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    console.log('JwtAuthGuard - handleRequest - err:', err);
    console.log('JwtAuthGuard - handleRequest - user:', user);
    if (err || !user) {
      throw err || new UnauthorizedException('Non authentifié');
    }
    return user;
  }
} 