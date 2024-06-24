import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergepptComponent } from './mergeppt/mergeppt.component';
import { LoginComponent } from './login/login.component';
import { MetadataComponent } from './metadata/metadata.component';
import { MergeslidesComponent } from './mergeslides/mergeslides.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'splitPPt',component:MergepptComponent},
  {path:'metadata',component:MetadataComponent},
  {path:'mergePPt',component:MergeslidesComponent},
  {path:'search',component:SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
