import { NgModule } from '@angular/core';

export const APP_DI_CONFIG: any = {
     // For api calls  
    
     parentDomain : 'http://10.0.0.163:8081',

     // https://localhost:44361/api/AuthManagement/Sign-In
  
      endPoints: {
          Authentication:{
              Login:'/api/AuthManagement/Sign-In',
              CreateUser: '/api/AuthManagement/Create-User',
              //Register:'auth.register_user',
              VerifyEmail: '/api/AuthManagement/VerifyEmail',
              ForgotPassword: '/api/AuthManagement/ForgotPassword',
              ResetPassword : '/api/AuthManagement/ResetPassword',
              VerifyOTP : '/api/AuthManagement/VerifyOTP',
              SendEmail : '/api/AuthManagement/SendEmail'
          },
          split:{
              splitPPT:'/syncFusion-Split',
              addmetadata:'/insert-MetaData'
          },
          mergeSlides:{
           getAllSlides:'/get-all-slides-object-url',
           searchSlides:'/search-slide',
           mergeSlide:'/merge-slide'
          }
      
  
  
      }
  
  
};

@NgModule({
})
export class AppConfigModules {}