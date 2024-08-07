import { NgModule } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { FeedbackComponent } from './feedback/feedback.component';
import { MergeslidesComponent } from './mergeslides/mergeslides.component';
import { MetadataComponent } from './metadata/metadata.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { ViewPptComponent } from './view-ppt/view-ppt.component';
import { SplitpptComponent } from './splitppt/splitppt.component';
import { AddpptComponent } from './addppt/addppt.component';
import { SearchpptComponent } from './searchppt/searchppt.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    MaterialModule,
    CommonModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,// 3 seconds
      progressBar: true,
    })
  ],
  declarations: [
    MetadataComponent,
    MergeslidesComponent,
    FeedbackComponent,
    DataNotFoundComponent,
    
    FilterPipe,
          ViewPptComponent,
          SplitpptComponent,
          AddpptComponent,
          SearchpptComponent
  ]
})

export class PagesModule {}
