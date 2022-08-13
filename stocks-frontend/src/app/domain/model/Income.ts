export interface Income {
  id: string;
  type: IncomeType;
  name: string;
  value: number;
  userId: string;
  projectId: string| null;
}

export enum IncomeType {
  IMMO,
  SALAIRE,
  Autre
}


export function getIncomeTypeKeys() {
  return Object.keys(IncomeType).filter(f => {
    return !isNaN(Number(f))
  }).map(value => {
    return parseInt(value)
  })
}

export function getIncomeTypeValues() {
  return Object.keys(IncomeType).filter(f => {
    return isNaN(Number(f))
  })
}
