import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private http = inject(HttpClient);

    private getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '1qaz2wsx3edC'
        });
    }

    list() {
      return this.http.get('http://localhost:8080/v1/contacts', { headers: this.getHeaders() });
    }

    get(id: string) {
      return this.http.get(`http://localhost:8080/v1/contacts/${id}`, { headers: this.getHeaders() });
    }

    create(contact: any) {
      return this.http.post('http://localhost:8080/v1/contacts', contact, { headers: this.getHeaders() });
    }

    update(id: string, contact: any) {
      return this.http.put(`http://localhost:8080/v1/contacts/${id}`, contact, { headers: this.getHeaders() });
    }

    delete(id: string) {
      return this.http.delete(`http://localhost:8080/v1/contacts/${id}`, { headers: this.getHeaders() });
    }
}
