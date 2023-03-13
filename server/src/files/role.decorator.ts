// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import { IRole } from 'src/interfaces';
// import { UserService } from 'src/user/user.service';

// export interface ICheckUserRole {
//   userIDKey: string;
//   fileIDKey: string;
//   requiredRole: IRole;
// }

// export const CheckUserRole = createParamDecorator(
//   (options: ICheckUserRole, ctx: ExecutionContext) => {
//     const req = ctx.switchToHttp().getRequest<Request>();
//     const userID = req.params[options.userIDKey];
//     const fileID = req.params[options.fileIDKey];
//     const userService = ctx.switchToHttp().getRequest(UserService);

//     const user = userService.getUser(userID);

//     const userFile = user.files.find((file) => file.fileID.toString() === fileID);
//     if (!userFile) {
//       throw new UnauthorizedException('You do not have access to this file');
//     }

//     const hasRole = userFile.role.includes(options.requiredRole);
//     if (!hasRole) {
//       throw new UnauthorizedException('You do not have sufficient privileges to perform this action');
//     }

//     return { userID, fileID };
//   },
// );
