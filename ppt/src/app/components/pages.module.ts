import { NgModule } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { FeedbackComponent } from './feedback/feedback.component';
import { MergepptComponent } from './mergeppt/mergeppt.component';
import { MergeslidesComponent } from './mergeslides/mergeslides.component';
import { MetadataComponent } from './metadata/metadata.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { ViewPptComponent } from './view-ppt/view-ppt.component';
import { SplitpptComponent } from './splitppt/splitppt.component';
import { AddpptComponent } from './addppt/addppt.component';


@NgModule({
  imports: [
    MaterialModule,CommonModule
  ],
  declarations: [
    MergepptComponent,
    MetadataComponent,
    MergeslidesComponent,
    SearchComponent,
    FeedbackComponent,
    DataNotFoundComponent,
    
    FilterPipe,
          ViewPptComponent,
          SplitpptComponent,
          AddpptComponent
  ]
})

export class PagesModule {}
