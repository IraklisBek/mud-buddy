import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpContextToken } from '@angular/common/http';
import { Observable, from, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InterceptorService, RequestType } from '../../services/interceptor.service';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
export const SET_INVALID_TOKEN = new HttpContextToken(() => false);

@Injectable()
export class BrowserHttpInterceptor implements HttpInterceptor {

    // This array stores the requests' urls that have been already assesed using the invalid token.
    // That way we achieve to assess each request only once.
    private assessedInvalidTokenRequests: string[] = []
    private debugMode = environment.verboseLogging;

    constructor(
        private auth: AuthService,
        private interceptorService: InterceptorService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.interceptorService.getRequestType(request) === RequestType.BROWSER) {
            console.log("[INFO.browser.interceptor] Triggered")
            return of(this.shouldSetInvalidToken(request)).pipe(
                switchMap((shouldSetInvalidToken: boolean) => {
                    if (shouldSetInvalidToken) {
                        this.assessedInvalidTokenRequests.push(request.url);
                        return of(this.auth.getInvalidToken());
                    }
                    return from(this.auth.getToken())
                }),
                switchMap(accessToken => next.handle(this.handleBrowserRequest(request, accessToken))),
                map<HttpEvent<any>, any>((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                    }
                    return event;
                }),
                catchError(err => { // <--- This is comming from the error.interceptor
                    return throwError(err);
                })
            )
        }
        return next.handle(request)
    }

    shouldSetInvalidToken(request: HttpRequest<any>): boolean {
        return request.context.get(SET_INVALID_TOKEN) && !this.assessedInvalidTokenRequests.find(url => request.url === url);
    }


    private handleBrowserRequest(request: HttpRequest<any>, accessToken) {

        if (this.debugMode) {
            console.log('[INFO.browser.interceptor] Intercepted request:');
            console.log(request);
            console.log('[INFO.browser.interceptor] Available token:');
            console.log(accessToken);
        }

        // because we may seek for substring (e.g. /oauth/token)
        let isInWhitelist = !!environment.WHITE_LIST_EXCEPTIONS.find(el => request.url.includes(el));

        if (isInWhitelist) {
            // Apply the Authorization Basic Header on the https://biopix-t.atlassian.net
            if (request.url.includes('https://biopix-t.atlassian.net')) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Basic bmZpa2FzQGJpb3BpeC10LmNvbTpBbm5zWWJCbllHZDdYRGZzcnk0bENDNTM=`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
            }

            // Apply the Authorization Basic Header on the oauth/token endpoint
            if (request.url.includes('/oauth/token')) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Basic YmlvcGl4LWFwcDptOHhUKkRLelFtMzZqd04yIXReWQ==`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            }
        } else {
            // Apply the Authorization Bearer Header only if exists
            if (accessToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
        }

        return request;
    }
}
