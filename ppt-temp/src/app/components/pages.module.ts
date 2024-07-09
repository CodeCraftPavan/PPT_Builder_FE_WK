import { NgModule } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { FeedbackComponent } from './feedback/feedback.component';
import { MergepptComponent } from './mergeppt/mergeppt.component';
import { MergeslidesComponent } from './mergeslides/mergeslides.component';
import { MetadataComponent } from './metadata/metadata.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    MergepptComponent,
    MetadataComponent,
    MergeslidesComponent,
    SearchComponent,
    FeedbackComponent,
    FilterPipe
  ]
})

export class PagesModule {}
