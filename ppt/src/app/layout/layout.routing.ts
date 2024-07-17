import { Routes } from '@angular/router';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { MergeslidesComponent } from 'src/app/components/mergeslides/mergeslides.component';
import { MetadataComponent } from 'src/app/components/metadata/metadata.component';
import { SplitpptComponent } from '../components/splitppt/splitppt.component';
import { AddpptComponent } from '../components/addppt/addppt.component';
import { SearchpptComponent } from '../components/searchppt/searchppt.component';

export const LayoutRoutes: Routes = [
   { path:'mergeppt',component:MergeslidesComponent },
   { path:'splitppt',component:SplitpptComponent },
   { path:'searchppt',component:SearchpptComponent },
   { path:'metadata',component:MetadataComponent },
   { path:'keypoints', component: FeedbackComponent },
   { path:'addppt', component: AddpptComponent}
  
];
