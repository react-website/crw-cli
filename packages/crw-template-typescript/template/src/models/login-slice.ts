import type { UserType } from "@/models/common"

export interface LoginState {
    token: string;
    username: string;
    avatar: string;
    type: UserType,
    phoneNumber: string | number;
    realName: string;
    gender: string;
    age: number
}

export interface LoginParams {
    username: string;
    password: string;
    userType: UserType
}

export interface UserInfo {

}
