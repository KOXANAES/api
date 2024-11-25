import { IUser } from "../IUser"

export interface AuthResponce {
  nickname: any 
  accessToken: string 
  refreshToken: string
  user: IUser
}