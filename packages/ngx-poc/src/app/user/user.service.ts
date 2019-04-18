import { Injectable } from '@angular/core';
import { UserState } from 'business';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserState {
  constructor() {
    super();
  }
}
