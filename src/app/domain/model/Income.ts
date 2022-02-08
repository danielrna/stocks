export interface Income {
  id: string;
  type: IncomeType;
  name: string;
  value: number;
  ownerId: string;
}

export enum IncomeType {
  Immobilier,
  Salaire,
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
