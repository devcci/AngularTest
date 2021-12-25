import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuseSharedModule } from '@fuse/shared.module';
import { DownloadFormComponent } from './download-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DownloadFormComponent],
  exports: [DownloadFormComponent],
  imports: [
    CommonModule,
    TranslateModule,

    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    FuseSharedModule,
    MatDialogModule
  ]
})
export class DownloadFormModule { }
