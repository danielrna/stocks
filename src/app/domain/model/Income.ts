export interface Income {
  id: string;
  type: IncomeType;
  name: string;
  value: number;
}

enum IncomeType {
  IMMO, SALARY
}
