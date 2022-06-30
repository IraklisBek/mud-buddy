import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  isLoggedIn() {
    return false;
  }

  /**
  * We do this because we have no auth guards since the user can continue as guest to the app.
  * So, if he has already logged in, he will be redirected to homepage
  */
  autoAuthUser() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/tabs/buildings'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

}
