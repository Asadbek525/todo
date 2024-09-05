import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent,
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
        title: 'Register',
      },
    ],
  },
  {
    path: 'todo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/todo/todo.component').then((m) => m.TodoComponent),
    title: 'Todo',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
