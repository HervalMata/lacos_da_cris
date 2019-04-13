import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {User} from "../model";
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "../../environments/environment";

const TOKEN_KEY = 'lacos_da_cris_token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    me: User = null;

    constructor(private http: HttpClient) {
        const token = this.getToken();
        this.setUserFromToken(token);
    }

    login(user: { email: string, password: string }): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${environment.api.url}/login`, user)
            .pipe(
                tap(response => {
                    this.setToken(response.token);
                })
            );
    }

    setToken(token: string) {
        this.setUserFromToken(token);
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    private setUserFromToken(token: string) {
        const decodedToken = new JwtHelperService().decodeToken(token);
        this.me = decodedToken ? {
            id: decodedToken.sub,
            name: decodedToken.name,
            email: decodedToken.email,
        } : null;
    }

    isAuth(): boolean {
        const token = this.getToken();
        return !new JwtHelperService().isTokenExpired(token, 30);
    }

    logout(): Observable<any> {
        return this.http.post<{ token: string }>(`${environment.api.url}/logout`, {})
            .pipe(
                tap(() => {
                    this.setToken(null);
                })
            );
    }

    get authorizationHeader() {
        return `Bearer ${this.getToken()}`;
    }
}
