import {Observable} from "rxjs";

export interface MiniCardData {
  title: string,
  value: Observable<string>,
  symbol: string
}
