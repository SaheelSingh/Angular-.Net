import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private isBrowser: boolean;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  apiUrl = "https://localhost:7051";

  private getAuthHeaders(): HttpHeaders {
    if (this.isBrowser) {
      const token = localStorage.getItem('jwttoken');
      if (token) {
        return new HttpHeaders({
          Authorization: `Bearer ${token}`    // wrap the whole value in backticks
        });
      }
    }
    // fallback: no token or not in browser
    return new HttpHeaders();
  }

  headers = this.getAuthHeaders();

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProducts`, {headers: this.headers});
  }

  postProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, data,  {headers: this.headers});
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Products/${id}`, {headers: this.headers});
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProduct?id=${id}`, data, {headers: this.headers})
  } 
}
