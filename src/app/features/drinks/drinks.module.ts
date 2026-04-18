import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './component/drinks/drinks.component';
import { DrinksRoutingModule } from './drinks-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DrinksComponent],
  imports: [
    CommonModule,
    FormsModule,
    DrinksRoutingModule   // <--- Import routing module here!
  ]
})
export class DrinksModule { }
