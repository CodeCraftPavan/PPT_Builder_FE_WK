import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergepptComponent } from './mergeppt/mergeppt.component';
import { LoginComponent } from './login/login.component';
import { MetadataComponent } from './metadata/metadata.component';
import { SearchComponent } from './search/search.component';
import { MergeslidesComponent } from './mergeslides/mergeslides.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';

const routes: Routes = [
  { path:'home',component:HomeComponent },
  { path:'Merge',component:MergeslidesComponent },
  { path:'splitPPt',component:MergepptComponent },
  { path:'metadata',component:MetadataComponent },
  { path:'search',component:SearchComponent },
  { path:'',component:LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'feedback', component: FeedbackComponent },
  { path:'accountCreation', component: AccountCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
