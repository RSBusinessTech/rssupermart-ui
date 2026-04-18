import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnacksComponent } from './component/snacks/snacks.component';
import { SnacksRoutingModule } from './snacks-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SnacksComponent],
  imports: [
    CommonModule,
    FormsModule,
    SnacksRoutingModule   // <--- Import routing module here!
  ]
})
export class SnacksModule { }
