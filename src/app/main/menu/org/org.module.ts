import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgComponent } from './org.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DownloadFormModule } from './download-form/download-form.module';
import { DownloadFormComponent } from './download-form/download-form.component';

const routes = [
  {
    path: '',
    component: OrgComponent,
  }
];

@NgModule({
  declarations: [OrgComponent],
  exports: [OrgComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DownloadFormModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [DownloadFormComponent]
})
export class OrgModule { }
