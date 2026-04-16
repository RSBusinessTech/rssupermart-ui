import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeComponent } from './component/cafe/cafe.component';
import { CafeRoutingModule } from './cafe-routing.module';
@NgModule({
  declarations: [CafeComponent],
  imports: [
    CommonModule,
    CafeRoutingModule   // <--- Import routing module here!
  ]
})
export class CafeModule { }
