import { Routes } from '@angular/router';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';
import { OrderFormComponent } from './features/orders/order-form/order-form.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
  path: 'admin',
  canActivate: [adminGuard],
  loadComponent: () =>
    import('./features/admin/admin/admin.component')
      .then(m => m.AdminComponent)
},
{
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'products',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/products/product-list.component').then(
            (m) => m.ProductListComponent,
          ),
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./features/products/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
      },
      {
        path: 'products/:id/edit',
        loadComponent: () =>
          import('./features/products/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
      },
      {
        path: 'customers',
        children: [
          {
            path: '',
            component: CustomerListComponent
          },
          {
            path: 'new',
            component: CustomerFormComponent
          },
          {
            path: ':id/edit',
            component: CustomerFormComponent
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrderListComponent
          },
          {
            path: 'new',
            component: OrderFormComponent
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/orders/order-details/order-details.component')
                .then(m => m.OrderDetailsComponent)
          },
          {
            path: ':id/edit',
            component: OrderFormComponent
          }
        ]
      },
      {
        path: 'leads',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/leads/lead-list/lead-list.component')
                .then(m => m.LeadListComponent)
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/leads/lead-form/lead-form.component')
                .then(m => m.LeadFormComponent)
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/leads/lead-form/lead-form.component')
                .then(m => m.LeadFormComponent)
          }
        ]
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings/settings.component')
            .then(m => m.SettingsComponent)
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/admin/admin.component')
            .then(m => m.AdminComponent)
      },
      { path: '**', redirectTo: 'overview' },
    ],
  },
];
