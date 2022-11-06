import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InterceptorService, RequestType } from '../../services/interceptor.service';
import { LogsService } from '../../services/logs.service';
import { ErrorCode } from '../../models/error.model';

export enum APIErrorMessage {
    SSL_HIJACK = "Someone is trying to hijack the SSL connection. Please contact support",
    INTERNET_CONNECTION = "Probably there is a problem with internet connection. Please contact your IT Administrator."
}

@Injectable()
export class NativeErrorHttpInterceptor implements HttpInterceptor {
    debugMode = true;
    constructor(
        private interceptorService: InterceptorService,
        private logs: LogsService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.interceptorService.getRequestType(request) === RequestType.NATIVE) {
            return next.handle(request)
                .pipe(catchError(error => {
                    this.logs.add('[INFO.native.error.interceptor] Triggered');

                    if (this.debugMode) {
                        this.logs.add('[DEBUG.native.error.interceptor] Error catched:');
                        this.logs.add(JSON.stringify(error));
                    }

                    if (!error.status) { return Promise.reject(error); }

                    // Handle the various error types
                    const errorBody = this.handleErrors(request, error)

                    const response = new HttpResponse({
                        body: JSON.parse(errorBody),
                        status: error.status,
                        headers: error.headers,
                        url: error.url,
                    });

                    // It might also be using throwError probably.
                    return throwError(response.body);

                }));
        }
        return next.handle(request)
    }

    /*
    * This method returns the body attribute (as an object) of
    * the error response.
    */
    handleErrors(request: HttpRequest<any>, error) {
        switch (this.errorType(error)) {
            case 'SSLPinningError':
                return this.interceptorService.handleSSLPinningError(request);
            case 'InternetConnectionError':
                return this.interceptorService.handleInternetConnectionError();
            case 'InvalidTokenError':
                this.interceptorService.handleInvalidTokenError();
                return error.error
            default:
                return error.error
        }
    }

    private errorType(error): string {

        // Identify SSL pinning related error
        if (error.status === -2 && typeof error.error === 'string' && error.error.includes('SSLHandshakeException')) {
            return 'SSLPinningError';
        }

        // Identify internet connection related error
        if (error.status === -3) {
            return 'InternetConnectionError';
        }

        // Identify invalid token related error
        if (JSON.parse(error.error).error == ErrorCode.INVALID_TOKEN) {
            return 'InvalidTokenError';
        }

    }

}
