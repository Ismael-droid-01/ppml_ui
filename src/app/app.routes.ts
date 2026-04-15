import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlgorithmComponent } from './components/algorithm/algorithm';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'algorithm', component: AlgorithmComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
