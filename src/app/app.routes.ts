import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ModelConfig } from './components/dashboard/model-config/model-config';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'model-config', component: ModelConfig },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
