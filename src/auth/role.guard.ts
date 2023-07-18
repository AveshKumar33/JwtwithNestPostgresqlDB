import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Roles={
    ADMIN:"ADMIN",
    NORMAL_USER:"NORMAL_USER"
}

export class RoleGuard implements CanActivate {
    public role:string;
  constructor(role:string) {
    this.role=role;
  }

  async canActivate(context: ExecutionContext):Promise<boolean>{
    const cntx = GqlExecutionContext.create(context).getContext();
    const { role } = cntx.user;

    if (role=== this.role) {
      return true;
    } else {
        return false;
    }
  }
}