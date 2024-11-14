import $api from "../http";
import { AxiosResponse } from "axios";
import { IInspectionCard } from "../models/ICardNew";
import { Resident } from './../components/Forms/CardForms/FillCardForm';

export default class CardService { 
    static addCard(creationDate:Date, inspectionDeadline: Date, responsibleWorker: string, otherInfo: string, city: string, street: string, home: string, apartment: string, homeType: string, category: string, owner: string):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/add', {creationDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner})
    }
    static fillCard(id: number, rooms: string, APIs: string, faultyAPIs: string, noBatteryAPIs: string, ovens: string, faultyOvens: string, repairNeededOvens: string, residents: Resident[], violationIds: number[], changeStatus: string, fillDate:Date):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/fill', {id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violationIds, changeStatus, fillDate})
    }
    static deleteCard(id:number):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/destroy', {id})
    }
    static changeCard(id:number, param:string, value:string):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/change', {id, param, value})
    }
    static fetchCards():Promise<AxiosResponse<IInspectionCard[]>> { 
      return $api.get<IInspectionCard[]>('/db/findAll')
    }
    static fetchViolations():Promise<AxiosResponse<IInspectionCard[]>> { 
      return $api.get<IInspectionCard[]>('/db/fetchViolations')
    }

}
