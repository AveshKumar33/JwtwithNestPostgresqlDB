import { CanActivate, ExecutionContext, HttpStatus, HttpException, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const cntx = GqlExecutionContext.create(context).getContext();
        // console.log(cntx.req)
        const authorizationHeader = cntx.req.headers.authorization

        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            try {
                const user = jwt.verify(token, "key")
                cntx.user = user;
                console.log("Avesh katiyar----->>",user);
                return true;
            } catch (error) {
                throw new HttpException("invalid token : " + error.message, HttpStatus.UNAUTHORIZED);
            }

        } else {
            throw false;
        }
    }
}