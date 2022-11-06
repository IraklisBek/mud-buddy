import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthMock } from '../helpers/mocks/auth.mock';
import { AuthStorageKey, DecodedToken, LoginResponseSuccess } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private storage: Storage

  ) { }

  authSubject = new BehaviorSubject(false);

  async getToken(): Promise<string> {
    return this.storage.get('ACCESS_TOKEN');
  }

  public getInvalidToken(): string {
    return AuthMock.mockExpiredToken.access_token;
  }

  async setUser(token: LoginResponseSuccess) {
    const decodedToken = this.getJwtTokenDecoded(token.access_token)
    this.setAuth(true);
    await this.storage.set(AuthStorageKey.ACCESS_TOKEN, token.access_token);
    await this.storage.set(AuthStorageKey.EXPIRES_IN, token.expires_in);
    await this.storage.set(AuthStorageKey.USER_EMAIL, decodedToken.user_name);
  }

  /**
   * Decodes the access token to get sensitive data of user
   * 
   * @param accessToken the access token retrieved from backend
   * @returns the access token decoded. The model has been build based
   * on the objects printed with console log
   */
  private getJwtTokenDecoded(accessToken: string): DecodedToken {
    var base64Url = accessToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  async clearStorage() {
    this.setAuth(false);
    this.storage.remove(AuthStorageKey.USER_EMAIL);
    this.storage.remove(AuthStorageKey.ACCESS_TOKEN);
    this.storage.remove(AuthStorageKey.EXPIRES_IN);
  }

  isLoggedIn() {
    return this.authSubject.value;
  }

  private setAuth(state: boolean) {
    this.authSubject.next(state);
  }



  /**
  * We do this because we have no auth guards since the user can continue as guest to the app.
  * So, if he has already logged in, he will be redirected to homepage
  */
  autoAuthUser() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/tabs/home'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

}
