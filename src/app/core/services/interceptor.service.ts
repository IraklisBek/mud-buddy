import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LoginPage } from 'src/app/modules/auth/login/login.page';
import { APIErrorMessage } from '../helpers/interceptos/native-error.interceptor';
import { LogsService } from './logs.service';

export enum RequestType {
  BROWSER = "browser",
  NATIVE = "native"
}

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private logs: LogsService
  ) { }

  getRequestType(request: HttpRequest<any>): RequestType {
    let kind = !this.platform.is('cordova') || request.url.includes('i18n') ? RequestType.BROWSER : RequestType.NATIVE;
    return kind;
  }

  public handleSSLPinningError(request: HttpRequest<any>): {} {
    // Check if the error is due to SSL pinning on a non-oauth request
    if (!request.url.includes('/oauth/token')) {
      this.logs.add('SSL Hijacking detected');
      // Change the error object into a normal error response
      const error = {
        status: 'BAD_REQUEST',
        error: 'ERRSSLHIJACK',
        message: APIErrorMessage.SSL_HIJACK,
        dataType: null,
        data: null
      };

      return JSON.stringify(error);
    }

    // Check if the error is due to SSL pinning on an oauth request
    if (request.url.includes('/oauth/token')) {
      this.logs.add('SSL Hijacking detected');
      // Change the error object into a normal error response
      const error = {
        error: 'ERRSSLHIJACK',
        error_description: APIErrorMessage.SSL_HIJACK,
      };

      return JSON.stringify(error);
    }

  }

  public handleInternetConnectionError(): {} {
    const error = {
      status: 'BAD_REQUEST',
      error: 'ERRNOINTERNET',
      message: APIErrorMessage.INTERNET_CONNECTION,
      error_description: APIErrorMessage.INTERNET_CONNECTION,
      dataType: null,
      data: null
    };

    return JSON.stringify(error);
  }

  async handleInvalidTokenError(): Promise<any> {
    return this.presentReloginModal();
  }


  private async presentReloginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        isRelogin: true
      },
      backdropDismiss: false,
      id: 'relogin'
    });
    return await modal.present();
  }
}
