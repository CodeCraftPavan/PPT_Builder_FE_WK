import { Routes } from '@angular/router';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { MergepptComponent } from 'src/app/components/mergeppt/mergeppt.component';
import { MergeslidesComponent } from 'src/app/components/mergeslides/mergeslides.component';
import { MetadataComponent } from 'src/app/components/metadata/metadata.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { AuthGuard } from 'src/app/guard/auth.guard';


export const LayoutRoutes: Routes = [
   { path:'mergeppt',component:MergeslidesComponent },
   { path:'splitppt',component:MergepptComponent },
   { path:'metadata',component:MetadataComponent },
   { path:'search',component:SearchComponent },
  // { path: '', redirectTo: '/search', pathMatch: 'full' },
   { path: 'feedback', component: FeedbackComponent },
  

];
