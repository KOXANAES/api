import $api from "../http";
import { AxiosResponse } from "axios";
import { IInspectionCard } from "../models/ICardNew";
import { Resident } from './../components/Forms/CardForms/FillCardForm';

export default class CardService { 
    static fetchCards():Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.get<IInspectionCard[]>('/db/findAll')
    }
    static addCard(creationDate:Date, inspectionDate: string, inspectionDeadline: Date, responsibleWorker: string, otherInfo: string, city: string, street: string, home: string, apartment: string, homeType: string, category: string, owner: string):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/add', {creationDate, inspectionDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner})
    }
    static fillCard(id: number, rooms: string, APIs: string, faultyAPIs: string, noBatteryAPIs: string, ovens: string, faultyOvens: string, repairNeededOvens: string, residents: Resident[], violationIds: number[]):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/fill', {id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violationIds})
    }
    static deleteCard(id:number):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/destroy', {id})
    }
    static changeCard(id:number, param:string, value:string):Promise<AxiosResponse<IInspectionCard[]>> { 
        return $api.post('/db/change', {id, param, value})
    }
}
