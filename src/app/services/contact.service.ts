import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Contact } from '../model/contact.interface';
import { HttpClientService } from './http-client.service';

@Injectable({providedIn: 'root'})
export class ContactService extends HttpClientService {

	//private http = inject(HttpClient);

	private getHeaders() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': '1qaz2wsx3edC'
		});
	}

	getContacts() {
		return super.get<Contact[]>('http://localhost:8080/v1/contacts', this.getHeaders());
	}

	getContact(id: string) {
		return super.get<Contact>(`http://localhost:8080/v1/contacts/${id}`, this.getHeaders());
	}

	createContact(contact: Contact) {
		return super.post<Contact>('http://localhost:8080/v1/contacts', this.getHeaders(), contact);
	}

	updateContact(id: string, contact: Contact) {
		return super.put<Contact>(`http://localhost:8080/v1/contacts/${id}`, this.getHeaders(), contact);
	}

	deleteContact(id: string) {
		return super.delete(`http://localhost:8080/v1/contacts/${id}`, this.getHeaders());
	}

	// list() {
	//   return this.http.get<Contact[]>('http://localhost:8080/v1/contacts', { headers: this.getHeaders() });
	// }

	// get(id: string) {
	//   return this.http.get<Contact>(`http://localhost:8080/v1/contacts/${id}`, { headers: this.getHeaders() });
	// }

	// create(contact: Contact) {
	//   return this.http.post('http://localhost:8080/v1/contacts', contact, { headers: this.getHeaders() });
	// }

	// update(id: string, contact: Contact) {
	//   return this.http.put<Contact>(`http://localhost:8080/v1/contacts/${id}`, contact, { headers: this.getHeaders() });
	// }

	// delete(id: string) {
	//   return this.http.delete(`http://localhost:8080/v1/contacts/${id}`, { headers: this.getHeaders() });
	// }
}
