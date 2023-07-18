import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('User')
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

}