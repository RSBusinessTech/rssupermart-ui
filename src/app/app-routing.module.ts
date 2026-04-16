import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: 'grocery', loadChildren: () => import('./features/grocery/grocery.module').then(m => m.GroceryModule) },
  { path: 'snacks', loadChildren: () => import('./features/snacks/snacks.module').then(m => m.SnacksModule) },
  { path: 'drinks', loadChildren: () => import('./features/drinks/drinks.module').then(m => m.DrinksModule) },
  { path: 'stationery', loadChildren: () => import('./features/stationery/stationery.module').then(m => m.StationeryModule) },
  { path: 'cafe', loadChildren: () => import('./features/cafe/cafe.module').then(m => m.CafeModule) },
  { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
