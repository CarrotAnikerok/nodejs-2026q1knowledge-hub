// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRole } from 'src/constants/enums';
// import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
// import { ROLES_KEY } from 'src/decorators/role.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (isPublic) {
//       return true;
//     }

//     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()],
//     );

//     const request = context.switchToHttp().getRequest();

//     if (request.path === '/' || request.path === '/doc') {
//       return true;
//     }

//     const user = request.user;

//     if (!user) {
//       return false;
//     }

//     if (request.method === 'GET') {
//       return true;
//     }

//     if (user.role === UserRole.ADMIN) {
//       return true;
//     }

//     if (user.role === UserRole.EDITOR) {
//       if (!requiredRoles) {
//         return true;
//       }

//       return requiredRoles.some((role) => role === user.role);
//     }

//     throw new ForbiddenException('Not enough rights');
//   }
// }
