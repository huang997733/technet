import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
