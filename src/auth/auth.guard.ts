import { CanActivate, ExecutionContext, HttpStatus, HttpException, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const cntx = GqlExecutionContext.create(context).getContext();
    const { email, password } = cntx.req.body.variables;
    const user: User = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      cntx.user = user;
      return true;
    } else {
      throw new HttpException("UnAuthenticated", HttpStatus.UNAUTHORIZED);
    }
  }
}
// // export class AuthGuard implements CanActivate {
// //     constructor(private readonly userService: UserService) { }
// //     async CanActivate(context: ExecutionContext): Promise<Boolean> {
// //         const cntx = GqlExecutionContext.create(context).getContext()
// //         const { email, password } = cntx.req.body.variables;
// //         const user: User = await this.userService.findUserByEmail(email)

// //         if (user && user.password === password) {
// //             cntx.user = user;
// //             return true
// //         }
// //         else
// //             throw new HttpException("UnAuthenticated", HttpStatus.UNAUTHORIZWD);
// //     }
// // }

