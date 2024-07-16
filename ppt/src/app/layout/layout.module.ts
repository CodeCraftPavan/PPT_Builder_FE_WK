import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { LayoutRoutes } from './layout.routing';
import { HeaderComponent } from '../shared/header/header.component';
import { PagesModule } from '../components/pages.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,ReactiveFormsModule,
   PagesModule
  ],
  declarations: [
    HeaderComponent,
    LayoutComponent
  ]
})

export class LayoutModule {}
