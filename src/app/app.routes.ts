import { Routes } from '@angular/router';
import { CarModelComponent } from './component/car-model/car-model.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CarConfigComponent } from './component/car-config/car-config.component';

export const routes: Routes = [
    { path: 'step1', loadComponent: () => import('./component/car-model/car-model.component').then(a => a.CarModelComponent), },
    { path: 'step2', loadComponent: () => import('./component/car-config/car-config.component').then(a => a.CarConfigComponent), },
    { path: 'step3', loadComponent: () => import('./component/car-details/car-details.component').then(a => a.CarDetailsComponent), },
];
