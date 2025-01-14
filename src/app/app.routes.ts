import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', loadComponent:()=> import('./components/dashboard/dashboard.component').then(d => d.DashboardComponent)}
];
