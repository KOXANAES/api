import $api from "../http";
import { AxiosResponse  } from "axios";
import { AuthResponce } from "../models/responce/AuthResponse";

export default class AuthService { 
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> { 
    return $api.post<AuthResponce>('/auth/login', {email, password})
  }
  static async registration(email:string, password:string, nickname:string): Promise<AxiosResponse<AuthResponce>> { 
    return $api.post<AuthResponce>('/auth/registration', {email, password, nickname})
  }
  static async logout(): Promise<void> { 
    return $api.post('/auth/logout')
  }
  static async updateNickname(email:string, oldNickname:string, newNickname:string): Promise<AxiosResponse<AuthResponce>> { 
    return $api.post<AuthResponce>('/auth/updateNickname', {email, oldNickname, newNickname})
  }
  static async getUsers() {
    return $api.get('/auth/getUsers')
  }
}