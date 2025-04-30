import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { HomeComponent } from './pages/home.component';
import { RegisterComponent } from './pages/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
