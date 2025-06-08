import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private isBrowser: boolean;
  private apiUrl = "https://localhost:7051/api/Auth/login";

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password })
      .pipe(tap(res => {
        if (this.isBrowser) {
          localStorage.setItem('jwttoken', res.token);
        }
      }));
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('jwttoken');
    }
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false; // Server side: always false or customize as needed
    }
    const token = localStorage.getItem('jwttoken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getUsername(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    const token = localStorage.getItem('jwttoken');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.unique_name || decoded?.name || null;
    }
    return null;
  }
}