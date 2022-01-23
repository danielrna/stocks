import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
  }

  add(s: string) {
    console.log(s)
  }
}
