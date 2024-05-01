import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { RouterModule } from '@angular/router';
import { Contact } from '../../model/contact.interface';

@Component({
  selector: 'app-my-contacts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.css'
})
export class MyContactsComponent {

  private contactService = inject(ContactService);

    contacts: Contact[] = [];

    ngOnInit(): void {
        this.contactService.list()
        .subscribe(contacts => {
            console.log(contacts);
            this.contacts = contacts;
        });
    }

    deleteContact(contact: Contact) {
      this.contactService.delete(contact.contact_id)
      .subscribe(() => {
        this.contactService.list()
        .subscribe(contacts => {
            console.log(contacts);
            this.contacts = contacts;
        });
      });
    }
}
