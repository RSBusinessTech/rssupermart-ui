import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryComponent } from './component/grocery/grocery.component';
import { GroceryRoutingModule } from './grocery-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GroceryComponent],
  imports: [
    CommonModule,
    FormsModule,
    GroceryRoutingModule   // <--- Import routing module here!
  ]
})
export class GroceryModule { }
