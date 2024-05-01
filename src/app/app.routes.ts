import { Routes } from '@angular/router';

export const routes: Routes = [
	// Está es una manera de implementar las rutas...
	{
		path: '',
		loadComponent: () => import('./components/my-contacts/my-contacts.component').then(m => m.MyContactsComponent)
	},
    // Está es otra manera de importar la ruta, con clase default...
	{
		path: 'new-contact',
        loadComponent: () => import('./components/new-contact/new-contact.component')
	},
  {
		path: ':id/edit',
        loadComponent: () => import('./components/new-contact/new-contact.component')
	}
];
