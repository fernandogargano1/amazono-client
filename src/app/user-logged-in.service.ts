import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserLoggedInService {

  userLoggedIn = new Subject<void>();

  constructor() { }

  notifyUserLoggedIn() {
      this.userLoggedIn.next();
  }

}
