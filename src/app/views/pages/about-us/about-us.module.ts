import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ AboutUsComponent],
  imports: [
    CommonModule, 
    SharedModule,
    RouterModule.forChild([
      {path: 'about-us', component: AboutUsComponent}
    ])
  ]
})
export class AboutUsModule { }
