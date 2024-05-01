import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-new-contact',
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule],
    templateUrl: './new-contact.component.html',
    styleUrl: './new-contact.component.css'
})
export default class NewContactComponent {

  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required]],
    sur_name: ['', [Validators.required]],
    alias: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    photo: ['', [Validators.required]],
  });

  create() {
    const contact = this.form.value;
    this.contactService.create(contact)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
