import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModelConfig } from './components/dashboard/model-config/model-config';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'model-config', component: ModelConfig },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
