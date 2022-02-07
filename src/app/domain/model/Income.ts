export interface Income {
  id: string;
  type: IncomeType;
  name: string;
  value: number;
  ownerId: string;
}

export enum IncomeType {
  Immobilier ,
  Salaire
}
