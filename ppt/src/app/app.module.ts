import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { MergepptComponent } from './mergeppt/mergeppt.component';
import { LoginComponent } from './login/login.component';
import { MetadataComponent } from './metadata/metadata.component';
import { MergeslidesComponent } from './mergeslides/mergeslides.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MergepptComponent,
    LoginComponent,
    MetadataComponent,
    MergeslidesComponent,
    SearchComponent,
    FeedbackComponent,
    AccountCreationComponent
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,  multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
