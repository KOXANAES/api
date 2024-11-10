 import CardService from "../services/CardService";
import { Resident, Violation } from "../components/Forms/CardForms/FillCardForm";

export default class CardStore {
  async getCards() { 
    try { 
      const response = await CardService.fetchCards()
      const cards = response.data
      console.log(cards)
      return cards
    } catch(e) { 
      console.log(e)
    } 
  }   

  async addCard(creationDate: string, inspectionDate: string, inspectionDeadline: string, responsibleWorker: string, otherInfo: string, city: string, street: string, home: string, apartment: string, homeType: string, category: string, owner: string) { 
    try { 
      await CardService.addCard(creationDate, inspectionDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner)
    } catch(e:any) { 
      throw e
    } finally { 
    }
  }

  async fillCard(id:number, rooms: string, APIs: string, faultyAPIs: string, noBatteryAPIs: string, ovens: string, faultyOvens: string, repairNeededOvens: string, residents: Resident[], violations: Violation[]) { 
    try { 
      const violationIds = violations.map(violation => violation.id);
      console.log(violationIds)
      console.log(id)
      await CardService.fillCard(id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violationIds)
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
}

