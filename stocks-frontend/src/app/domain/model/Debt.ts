export interface Debt {
  id: string;
  type: DebtType;
  name: string;
  value: number;
  ownerId: string;
}

export enum DebtType {
  RP,
  Locatif,
  Auto,
  Conso,
  Autre
}

export function getDebtTypeKeys() {
  return Object.keys(DebtType).filter(f => {
    return !isNaN(Number(f))
  }).map(value => {
    return parseInt(value)
  })
}

export function getDebtTypeValues() {
  return Object.keys(DebtType).filter(f => {
    return isNaN(Number(f))
  })
}
