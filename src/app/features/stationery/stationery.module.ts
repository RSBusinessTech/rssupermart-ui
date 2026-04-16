import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationeryComponent } from './component/stationery/stationery.component';
import { StationeryRoutingModule } from './stationery-routing.module';
@NgModule({
  declarations: [StationeryComponent],
  imports: [
    CommonModule,
    StationeryRoutingModule   // <--- Import routing module here!
  ]
})
export class StationeryModule { }
