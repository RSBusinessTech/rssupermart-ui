import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeComponent } from './component/cafe/cafe.component';
import { CafeRoutingModule } from './cafe-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CafeComponent],
  imports: [
    CommonModule,
    FormsModule,
    CafeRoutingModule   // <--- Import routing module here!
  ]
})
export class CafeModule { }
