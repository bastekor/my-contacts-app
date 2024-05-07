import { Contact } from './../../model/contact.interface';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-new-contact',
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule],
    templateUrl: './new-contact.component.html',
    styleUrl: './new-contact.component.css'
})
export default class NewContactComponent implements OnInit {

    private fb = inject(FormBuilder);
    private contactService = inject(ContactService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    form?: FormGroup;
    contact?: Contact;

    ngOnInit(): void {

        // Validar id del contacto...
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {

          // Editar...
            this.contactService.getContact(id)
                .subscribe(contact => {

                    this.contact = contact;

                    this.form = this.fb.group({
                        name: [contact.name, [Validators.required]],
                        sur_name: [contact.sur_name, [Validators.required]],
                        alias: [contact.alias, [Validators.required]],
                        phone_number: [contact.phone_number, [Validators.required]],
                        email: [contact.email, [Validators.required, Validators.email]],
                        address: [contact.address, [Validators.required]],
                        photo: [contact.photo, [Validators.required]],
                    })
                });
        } else {

          // Crear...
            this.form = this.fb.group({
                name: ['', [Validators.required]],
                sur_name: ['', [Validators.required]],
                alias: ['', [Validators.required]],
                phone_number: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                address: ['', [Validators.required]],
                photo: ['', [Validators.required]]
            });
        }
    }

    save() {

        if (this.form?.invalid) {
        //     this.form.markAllAsTouched();
        //     return;
        return;
        }

        const contactForm = this.form!.value;
        let request: Observable<Contact>;

        if (this.contact) {
            // Editar
            request = this.contactService.updateContact(this.contact.contact_id, contactForm);
        } else {
            // Crear
            request = this.contactService.createContact(contactForm);
        }

        request.subscribe({
            next: () => this.router.navigate(['/']),
            error: error => console.log('Error Response :: ', error)
        });
    }
}
