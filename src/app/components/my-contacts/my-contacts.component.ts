import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { RouterModule } from '@angular/router';
import { Contact } from '../../model/contact.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-contacts',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.css'
})
export class MyContactsComponent {

  private contactService = inject(ContactService);

  contacts: Contact[] = [];

  ngOnInit(): void {
    this.contactService.getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.contact_id)
      .subscribe(() => {
        this.contactService.getContacts()
          .subscribe(contacts => {
            console.log(contacts);
            this.contacts = contacts;
          });
      });
  }
}
