import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/auth.model';

const BACKEND_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class AuthApi {

    constructor(
        private http: HttpClient
    ) { }

    login(loginForm: LoginForm) {
        return this.http.post(`${BACKEND_URL}/auth/login`, loginForm)
    }
}
