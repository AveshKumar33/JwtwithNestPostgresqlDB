import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserType } from "./user.type";
import { User } from "./user.entity";
const { v4: uuidv4 } = require('uuid');
import  * as Jwt from "jsonwebtoken";
import { JwtGuard } from "src/auth/jwt.guards";
import { RoleGuard, Roles } from "src/auth/role.guard";



@Resolver(Of => UserType)
export class UserResolver {
    constructor(private userService: UserService) { }
    @Query(returns => String)
    user() {
        const uuid = uuidv4();
        console.log(uuid);
        // console.log(typeof (uuid));
        return `hello avesh katiyar -->> ${typeof (uuid)}`
    }
    @Query(returns => [UserType])
    @UseGuards(AuthGuard)
    users() {
        return this.userService.users();
    }

    @Mutation(returns => String)
    createUser(
        @Args({ name: 'firstName', type: () => String }) firstName: string,
        @Args({ name: 'lastName', type: () => String }) lastName: string,
        @Args({ name: 'role', type: () => String }) role: string,
        @Args({ name: 'email', type: () => String }) email: string,
        @Args({ name: 'password', type: () => String }) password: string,
    ) {
        return this.userService.registerUser(firstName, lastName, email, password, role)
    }
    @Query(returns => String)
    @UseGuards(JwtGuard , new RoleGuard(Roles.ADMIN))
    securedDataForAdmin(@Context("user") user :any):String {
        return "secured guards for admin"+JSON.stringify(user);
    }

    @Query(returns => String)
    @UseGuards(JwtGuard , new RoleGuard(Roles.NORMAL_USER))
    securedDataForNormalUser(@Context("user") user :any):String {
        return "secured guards for normal user"+JSON.stringify(user);
    }

    @Query(returns => String)
    @UseGuards(AuthGuard)
    login(@Args({ name: 'email', type: () => String }) email:string,
    @Args({ name: 'password', type: () => String }) password:string,
    @Context("user") user:User):string {
        console.log("payloadpayload");

        let payload={
            id:user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            role:user.role
        }

        return Jwt.sign(payload,"key",{"expiresIn":"1d"})
        // return "login success"+ JSON.stringify(user)
        // return this.userService.findUserByEmail(email)
    }


}