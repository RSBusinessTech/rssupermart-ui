import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './component/about/about.component';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';

@NgModule({
  declarations: [AboutComponent,SafeUrlPipe],
  imports: [
    CommonModule,
    AboutRoutingModule   // <--- Import routing module here!
  ]
})
export class AboutModule { }
