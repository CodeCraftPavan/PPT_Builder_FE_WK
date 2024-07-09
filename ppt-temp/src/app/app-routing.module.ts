import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'}, 
  {path:'',component:LoginComponent},
  {
    path: 'dashboard',
    component: LayoutComponent,
    //canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => import('./layout/layout.module').then(x => x.LayoutModule)
  }]},
  {path: '**',redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
