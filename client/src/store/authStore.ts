import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponce } from "../models/responce/AuthResponse";
import { API_URL } from "../http";

export default class AuthStore {

  user =  {} as IUser;
  isAuth = false
  isLoading = false

  constructor() { 
    makeAutoObservable((this))
  }

  setAuth(bool:boolean) { 
    this.isAuth = bool
  }

  setUser(user:IUser) { 
    this.user = user
  }

  setLoading(bool:boolean) { 
    this.isLoading = bool
  }

  async login(email:string, password:string) { 
    try { 
      const response = await AuthService.login(email,password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e:any) { 
      throw e
    }
  }

  async registration(email:string, password:string, nickname:string) { 
    try { 
      const response = await AuthService.registration(email,password, nickname)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e:any) { 
      throw e
    }
  }

  async logout() { 
    try { 
      const response = await AuthService.logout()
      console.log(response)
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e:any) { 
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() { 
    try { 
      this.setLoading(true)
      const response = await axios.get<AuthResponce>(`${API_URL}/auth/refresh`, {withCredentials: true})
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch(e:any) { 
      console.log(e.response?.data?.message)
    } finally { 
      this.setLoading(false)
    }
  }

  async activate(Email:string) {
    const email = { 
        email:Email
    }
    const response = await axios.post(`${API_URL}/auth/sendMail`, email , {headers:{'authorization': `Bearer ${localStorage.token}`}})
    alert(response.data)
  }

  async sendTechMessage(useremail:string , message:string) { 
    try { 
      const UserEmail = useremail
      console.log(UserEmail)
      const reqData = {
          UserEmail:UserEmail, 
          message:message
      }
      const response = await axios.post(`${API_URL}/auth/help`, reqData, {headers:{'authorization': `Bearer ${localStorage.token}`}})
      return(response.data.message)
    } catch(e:any) { 
      throw e
    }
  }

  async updateNickname(email:string, oldNickname:string, newNickname:string) { 
    try {   
      const response = await AuthService.updateNickname(email, oldNickname, newNickname)
      this.setUser(response.data.user)
    } catch(e) { 
      throw e
    }
  }
  async updateEmail(email:string, newEmail:string) { 
    try {   
      const response = await AuthService.updateEmail(email, newEmail)
      this.setUser(response.data.user)
    } catch(e) { 
      throw e
    }
  }
  async changePassword(email: string, oldPassword:string, newPassword:string, confirmPassword:string) { 
    try { 
      const response = await AuthService.changePassword(email, oldPassword, newPassword, confirmPassword)
    } catch(e) {
      throw e
    }
  }

  async getUsers() { 
    try { 
      const response = await AuthService.getUsers()
      const userArray = response.data;
      return userArray
    } catch(e) { 
      throw(e)
    }
  }



}