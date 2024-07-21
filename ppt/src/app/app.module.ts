import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { SortableheaderDirective } from './shared/directive/sortableheader.directive';
import { PagesModule } from './components/pages.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SortableheaderDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,BrowserAnimationsModule,PagesModule,SharedModule,
    AppRoutingModule,LayoutModule,HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,// 3 seconds
      progressBar: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
