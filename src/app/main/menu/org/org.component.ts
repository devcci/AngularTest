import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DownloadFormComponent } from './download-form/download-form.component';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {

  dialogRef: any;

  constructor(
    private _matDialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
  }

  openPopup(): void {
    console.log('open Popup');

    this.dialogRef = this._matDialog.open(DownloadFormComponent, {
      data: {
        mode: 'view',
        // item: this.searchFields,
        // itemNav: this.navInfo
      },
      disableClose: true,
      panelClass: 'download-form-layout'
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
      });
  }
}
