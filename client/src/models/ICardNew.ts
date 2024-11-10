export interface IInspectionCard {
  id: number;
  creationDate: string;
  inspectionDate: string;
  inspectionDeadline: string;
  responsibleWorker: string;
  status: string;
  otherInfo: string;
  category: string,
  char: ICharacteristics;
  adress: IAddress;
  residents: IResident[];
  violations: IViolation[];
}

interface ICharacteristics {
  id: number;
  owner: string,
  homeType: string;
  rooms: string;
  APIs: string;
  faultyAPIs: string;
  noBatteryAPIs: string;
  ovens: string;
  faultyOvens: string;
  repairNeededOvens: string;
  cardId: number;
}

interface IAddress {
  id: number;
  city: string;
  street: string;
  home: string;
  apartment: string;
  cardId: number;
}

interface IResident {
  id: number;
  name: string;
  surname: string;
  paternity: string;
  birth: string;
  cardId: number;
}

interface IViolation {
  id: number;
  name: string;
  description: string;
  cardviol: {
    cardId: number;
    violationId: number;
  }
}