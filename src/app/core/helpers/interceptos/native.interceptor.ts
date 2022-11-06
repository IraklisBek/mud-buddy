import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpClient, HttpHeaders, HttpContextToken } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { LogsService } from '../../services/logs.service';
import { InterceptorService, RequestType } from '../../services/interceptor.service';
export const SET_INVALID_TOKEN = new HttpContextToken(() => false);

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';

/**
 * This interceptor implements:
 * - Token append in headers
 * - Handling requests natevely
 * - Loading spinner when requests are happening
 *
 * References for native requests:
 * https://bit.ly/2NL3lFR
 * https://bit.ly/3iWRyzu
 *
 * Reference for loading spinner:
 * https://medium.com/swlh/angular-loading-spinner-using-http-interceptor-63c1bb76517b
 */

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {

    // This array stores the requests' urls that have been already assesed using the invalid token.
    // That way we achieve to assess each request only once.
    private assessedInvalidTokenRequests: string[] = []
    private debugMode = environment.verboseLogging;

    constructor(
        private nativeHttp: HTTP,
        private platform: Platform,
        private auth: AuthService,
        private logs: LogsService,
        private interceptorService: InterceptorService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.interceptorService.getRequestType(request) === RequestType.NATIVE) {
            this.logs.add("[INFO.native.interceptor] Triggered")
            return of(this.shouldSetInvalidToken(request)).pipe(
                switchMap((shouldSetInvalidToken: boolean) => {
                    if (shouldSetInvalidToken) {
                        this.assessedInvalidTokenRequests.push(request.url);
                        return of(this.auth.getInvalidToken());
                    }
                    return from(this.auth.getToken())
                }),
                switchMap(accessToken => from(this.handleNativeRequest(request, accessToken)))
            )
        }
        return next.handle(request)
    }

    shouldSetInvalidToken(request: HttpRequest<any>): boolean {
        return request.context.get(SET_INVALID_TOKEN) && !this.assessedInvalidTokenRequests.find(url => request.url === url);
    }

    private async handleNativeRequest(request: HttpRequest<any>, accessToken: string): Promise<HttpResponse<any>> {
        let serializer: 'json' | 'urlencoded' | 'utf8' | 'multipart' | 'raw' = 'json';
        const isAtlassianSupportRequest = request.url.includes('https://biopix-t.atlassian.net') ? true : false;
        const method = request.method.toLowerCase() as HttpMethod;
        const headerKeys = request.headers.keys();
        const headers = {};
        let data = {};
        const params = (method === 'get') ? this.prepareGETParams(request) : {};

        headerKeys.forEach((key) => {
            headers[key] = request.headers.get(key);
        });

        // because we may seek for substring (e.g. /oauth/token)
        let isInWhitelist = !!environment.WHITE_LIST_EXCEPTIONS.find(el => request.url.includes(el));

        if (isInWhitelist) {

            // Apply the Authorization Basic Header on the https://biopix-t.atlassian.net
            if (isAtlassianSupportRequest) {
                if (request.url.includes('attachTemporaryFile')) {
                    // Because we send FormData to the request
                    serializer = 'multipart'
                }
                const authoriazationHeader = 'Authorization';
                headers[authoriazationHeader] = 'Basic bmZpa2FzQGJpb3BpeC10LmNvbTpBbm5zWWJCbllHZDdYRGZzcnk0bENDNTM=';
            }

            // Apply the Authorization Basic Header on the oauth/token endpoint
            if (request.url.includes('/oauth/token')) {
                serializer = 'urlencoded';  // This sets the content header type into 'application/x-www-form-urlencoded';
                const authoriazationHeader = 'Authorization';
                headers[authoriazationHeader] = 'Basic YmlvcGl4LWFwcDptOHhUKkRLelFtMzZqd04yIXReWQ==';
            }

        } else {

            // Apply the Authorization Bearer Header only if access token exists
            if (accessToken) {
                const authoriazationHeader = 'Authorization';
                headers[authoriazationHeader] = `Bearer ${accessToken}`;
            }

        }

        if (this.debugMode) {
            this.logs.add('[DEBUG.native.interceptor] Original request:');
            this.logs.add(JSON.stringify(request));
            this.logs.add('[DEBUG.native.interceptor] Reuest\'s body:');
            this.logs.add(JSON.stringify(request.body));
            this.logs.add('[DEBUG.native.interceptor] Request\'s params:');
            this.logs.add(JSON.stringify(request.params.keys()));
            this.logs.add('[DEBUG.native.interceptor] Header to be applied:');
            this.logs.add(JSON.stringify(headers));
        }

        try {
            await this.platform.ready();

            if (serializer === 'multipart') {
                data = request.body
            } else {
                data = (method === 'post' || method === 'put') ? this.preparePOSTPUTData(request) : {};
            }

            const requestOptions = {
                method,
                data,
                params,
                headers,
                serializer,
            };

            if (this.debugMode) {
                this.logs.add('[DEBUG.native.interceptor] Full modified request');
                this.logs.add(JSON.stringify(requestOptions));
            }

            const nativeHttpResponse = await this.nativeHttp.sendRequest(request.url, requestOptions);

            let body;

            try {
                body = JSON.parse(nativeHttpResponse.data);
            } catch (error) {
                body = { response: nativeHttpResponse.data };
            }

            if (this.debugMode) {
                this.logs.add('[DEBUG.native.interceptor] Response body:');
                this.logs.add(JSON.stringify(body));
            }

            const response = new HttpResponse({
                body,
                status: nativeHttpResponse.status,
                headers: new HttpHeaders(nativeHttpResponse.headers),
                url: nativeHttpResponse.url,
            });

            return Promise.resolve(response);
        } catch (error) {
            // native-error.interceptor handles this
            return Promise.reject(error);
        }
    }

    private prepareGETParams(request: HttpRequest<any>): { [index: string]: string | number; } {
        const paramsKeys = request.params.keys();
        const alteredGETParams = {};

        for (const key of paramsKeys) {
            alteredGETParams[key] = request.params.get(key);
        }

        if (this.debugMode) {
            this.logs.add('[DEBUG.native.interceptor] Modified GET params');
            this.logs.add(JSON.stringify(alteredGETParams));
        }

        return alteredGETParams;
    }

    private preparePOSTPUTData(request: HttpRequest<any>) {
        let alteredPOSTParams = {};

        if (request.method === 'POST' && request.url.includes('/oauth/token')) {
            // Transform data for the POST requests
            // This is needed because /oauth/token expects body
            // parameters to be encoded as 'application/x-www-form-urlencoded'
            for (const item of request.body.updates) {
                alteredPOSTParams[item.param] = item.value;
            }
        } else {
            alteredPOSTParams = JSON.parse(JSON.stringify(request.body));
        }

        if (this.debugMode) {
            this.logs.add('[DEBUG.native.interceptor] Modified POST params');
            this.logs.add(JSON.stringify(alteredPOSTParams));
        }

        return alteredPOSTParams;
    }
}

