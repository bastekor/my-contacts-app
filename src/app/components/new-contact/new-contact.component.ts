import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact.interface';

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

			this.contactService.getContact(id)
				.subscribe(contact => {

					this.contact = contact;

					this.form = this.fb.group({
						name: [contact.name, [Validators.required]],
						sur_name: [contact.sur_name, [Validators.required]],
						alias: [contact.alias, [Validators.required]],
						phone_number: [contact.phone_number, [Validators.required]],
						email: [contact.email, [Validators.required]],
						address: [contact.address, [Validators.required]],
						photo: [contact.photo, [Validators.required]],
					})
				});
		} else {

			this.form = this.fb.group({
				name: ['', [Validators.required]],
				sur_name: ['', [Validators.required]],
				alias: ['', [Validators.required]],
				phone_number: ['', [Validators.required]],
				email: ['', [Validators.required]],
				address: ['', [Validators.required]],
				photo: ['', [Validators.required]]
			});
		}
	}

	save() {

		const contactForm = this.form!.value;

		if (this.contact) {
			// Editar
			this.contactService.updateContact(this.contact.contact_id, contactForm)
				.subscribe(contact => {
					this.router.navigate(['/']);
				});
		} else {
			// Crear
			this.contactService.createContact(contactForm)
				.subscribe(() => {
					this.router.navigate(['/']);
				});
		}
	}
}
