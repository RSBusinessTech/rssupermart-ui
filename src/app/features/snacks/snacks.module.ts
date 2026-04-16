import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnacksComponent } from './component/snacks/snacks.component';
import { SnacksRoutingModule } from './snacks-routing.module';
@NgModule({
  declarations: [SnacksComponent],
  imports: [
    CommonModule,
    SnacksRoutingModule   // <--- Import routing module here!
  ]
})
export class SnacksModule { }
