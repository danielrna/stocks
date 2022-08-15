export interface House {
  acquisitionDate: string;
  id: string | null;
  type: HouseType;
  name: string;
  acquisitionPrice: number;
  city: string;
  userId: string;
  projectId: string | null;
}

export enum HouseType {
  APPART,
  MAISON,
  IMMEUBLE,
  BATEAU,
}


export function getHouseTypeKeys() {
  return Object.keys(HouseType).filter(f => {
    return !isNaN(Number(f))
  }).map(value => {
    return parseInt(value)
  })
}

export function getHouseTypeValues() {
  return Object.keys(HouseType).filter(f => {
    return isNaN(Number(f))
  })
}
