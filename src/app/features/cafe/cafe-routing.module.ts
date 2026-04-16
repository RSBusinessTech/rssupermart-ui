import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CafeComponent } from './component/cafe/cafe.component';

const routes: Routes = [{ path: '', component: CafeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeRoutingModule { }
