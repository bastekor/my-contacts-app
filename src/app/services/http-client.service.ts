import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, headers: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(url, {headers});
  }

  post<T>(url: string, headers: HttpHeaders, body:T) {
    return this.httpClient.post<T>(url, body, {headers});
  }

  put<T>(url: string, headers: HttpHeaders, body:T) {
    return this.httpClient.put<T>(url, body, {headers});
  }

  delete<T>(url: string, headers: HttpHeaders) {
    return this.httpClient.delete<T>(url, {headers});
  }
}
