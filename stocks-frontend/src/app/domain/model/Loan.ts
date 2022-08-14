export interface Loan {
  id: string;
  type: LoanType;
  name: string;
  value: number;
  userId: string;
}

export enum LoanType {
  RP,
  LOCATIF,
  AUTO,
  CONSO,
  AUTRE
}

export function getLoanTypeKeys() {
  return Object.keys(LoanType).filter(f => {
    return !isNaN(Number(f))
  }).map(value => {
    return parseInt(value)
  })
}

export function getLoanTypeValues() {
  return Object.keys(LoanType).filter(f => {
    return isNaN(Number(f))
  })
}
