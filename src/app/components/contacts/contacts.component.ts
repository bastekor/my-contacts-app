import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export default class ContactsComponent implements OnInit {

    private contactService = inject(ContactService);

    contacts:any[] = [];

    ngOnInit(): void {
        this.contactService.list()
        .subscribe((contacts: any) => {
            console.log(contacts);

            this.contacts = contacts;
        });

        this.contactService.get('68e8c180-90b1-415b-9ad0-cea6a50afa60')
        .subscribe(contact => {
            console.log(contact);

        });
    }
}
