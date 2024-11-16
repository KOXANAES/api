import CardService from "../services/CardService";
import { Resident, Violation } from "../components/Forms/CardForms/FillCardForm";
import { makeAutoObservable } from "mobx";

export default class CardStore {

  fetchingCards = false

  constructor() { 
    makeAutoObservable((this))
  }

  setFetchingCards(bool:boolean) { 
    this.fetchingCards = bool
  }

  async addCard(creationDate:Date, inspectionDeadline: Date, responsibleWorker: string, otherInfo: string, city: string, street: string, home: string, apartment: string, homeType: string, category: string, owner: string) { 
    try { 
      await CardService.addCard(creationDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner)
    } catch(e:any) { 
      throw e
    } finally { 
    }
  }

  async fillCard(id:number, rooms: string, APIs: string, faultyAPIs: string, noBatteryAPIs: string, ovens: string, faultyOvens: string, repairNeededOvens: string, residents: Resident[], violations: Violation[], changeStatus:string, fillDate:Date) { 
    try { 
      const violationIds = violations.map(violation => violation.id);
      console.log(violationIds)
      console.log(id)
      await CardService.fillCard(id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violationIds, changeStatus, fillDate)
    } catch(e:any) { 
      throw e
    } finally { 
    }
  }

  async deleteCard(id:number) { 
    try {
      const response = await CardService.deleteCard(id)
      console.log(response)
    } catch(e:any) { 
      throw e
    } finally { 
    }
  }

  async changeCard(id:number, param:string, value:string) { 
    try {
      const response = await CardService.changeCard(id, param, value)
      console.log(response)
    } catch(e:any) { 
      throw e
    } finally { 
    }
  }
  
  async getCards() { 
    try { 
      const response = await CardService.fetchCards()
      const cards = response.data
      // console.log(cards)
      return cards
    } catch(e) { 
      console.log(e)
    }
  }   

  async getViolations() { 
    try { 
      const response = await CardService.fetchViolations()
      const violations = response.data
      console.log(violations)
      return violations
    } catch(e) { 
      console.log(e)
    } 
  }

}

