import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InterceptorService, RequestType } from '../../services/interceptor.service';
import { ErrorCode } from '../../models/error.model';

@Injectable()
export class BrowserErrorHttpInterceptor implements HttpInterceptor {
    constructor(
        private interceptorService: InterceptorService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.interceptorService.getRequestType(request) === RequestType.BROWSER) {
            return next.handle(request)
                .pipe(catchError(err => {
                    console.log('[INFO.browser.interceptor] Triggered');
                    console.log('[ERR.browser.interceptor] At request ' + JSON.stringify(request) + '\n\n the following ERROR received:' + JSON.stringify(err));
                    if (err.error.error === ErrorCode.INVALID_TOKEN) {
                        this.interceptorService.handleInvalidTokenError();
                    }
                    return throwError(err.error);
                }));
        }
        return next.handle(request)
    }

}
