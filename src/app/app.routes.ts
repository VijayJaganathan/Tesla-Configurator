import { Routes } from '@angular/router';
import { CarModelComponent } from './component/car-model/car-model.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CarConfigComponent } from './component/car-config/car-config.component';

export const routes: Routes = [
    { path: '', component:CarModelComponent},
    { path: 'step1', component: CarModelComponent },
    { path: 'step2', component: CarConfigComponent },
    { path: 'step3', component: CarDetailsComponent },
    { path: '**', redirectTo: 'step1', pathMatch: 'full' }
];
