import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationeryComponent } from './component/stationery/stationery.component';

const routes: Routes = [{ path: '', component: StationeryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationeryRoutingModule { }
