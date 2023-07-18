import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
const { v4: uuidv4 } = require('uuid')
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) public readonly userRepository:Repository<User>){}

    async findUserByEmail(email:string):Promise<User>{
        let user:User=await this.userRepository.findOne({where:{email:email}})
        return user
    }
    async registerUser(firstName:string,lastName:string,email:string,password:string,role:string):Promise<String>{
       const user= this.userRepository.create({
          id:uuidv4(),
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:password,
          role:role
        })
        this.userRepository.save(user)
        return  ` ${user.firstName+' '+user.lastName} you are successfully register `
    }
    async users () :Promise<User[]> {
        return await this.userRepository.find();
    }

}