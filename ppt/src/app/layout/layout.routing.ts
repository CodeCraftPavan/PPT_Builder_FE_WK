import { Routes } from '@angular/router';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { MergeslidesComponent } from 'src/app/components/mergeslides/mergeslides.component';
import { MetadataComponent } from 'src/app/components/metadata/metadata.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { SplitpptComponent } from '../components/splitppt/splitppt.component';
import { AddpptComponent } from '../components/addppt/addppt.component';


export const LayoutRoutes: Routes = [
   { path:'mergeppt',component:MergeslidesComponent },
   { path:'splitppt',component:SplitpptComponent },
   { path:'metadata',component:MetadataComponent },
   { path:'keypoints', component: FeedbackComponent },
   { path:'addppt', component: AddpptComponent}
  

];
