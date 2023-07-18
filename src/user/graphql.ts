
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface IQuery {
    user(): string | Promise<string>;
    users(): User[] | Promise<User[]>;
    securedDataForAdmin(): string | Promise<string>;
    securedDataForNormalUser(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
}

export interface IMutation {
    createUser(firstName: string, lastName: string, role: string, email: string, password: string): string | Promise<string>;
}

type Nullable<T> = T | null;
