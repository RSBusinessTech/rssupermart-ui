import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroceryComponent } from './component/grocery/grocery.component';

const routes: Routes = [{ path: '', component: GroceryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
