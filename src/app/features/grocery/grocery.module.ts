import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryComponent } from './component/grocery/grocery.component';
import { GroceryRoutingModule } from './grocery-routing.module';

@NgModule({
  declarations: [GroceryComponent],
  imports: [
    CommonModule,
    GroceryRoutingModule   // <--- Import routing module here!
  ]
})
export class GroceryModule { }
