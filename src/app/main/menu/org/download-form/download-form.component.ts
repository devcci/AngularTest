import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'app/main/common/service/common.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, filter, last, takeLast } from 'rxjs/operators';
// import { StatisticsService } from '../statistics.service';
// import { ngxCsv } from 'ngx-csv/ngx-csv';
// import { IotManagerService } from '../iot-manager-service';
// import { SearchIotManagerModel } from 'app/main/common/models/search/search-model.class';
import { fuseAnimations } from '@fuse/animations';
// import { PageOptsModel } from 'app/main/common/models/search-models';

@Component({
  selector: 'app-download-form',
  templateUrl: './download-form.component.html',
  styleUrls: ['./download-form.component.scss'],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None
})
export class DownloadFormComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  checkData: boolean;
  checkList: any;
  checkColumnList: any;
  checkColumnOrgList: any;
  delColumnList: any;

  dataList: any;
  dataDownloadList: any;
  searchFields: any;
  itemNav: any;

  constructor(
    public dialogRef: MatDialogRef<DownloadFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _translationService: TranslateService,
    // private _commonService: CommonService,
    // private _iotManagerService: IotManagerService,
    private _datePipe: DatePipe
  ) {
    this.itemNav = _data.itemNav;
    this.checkData = false;
    this.dataList = [];
    this.dataDownloadList = [];
    this._unsubscribeAll = new Subject();
    this.checkList = [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
    this.checkColumnOrgList = [
      'idx','unisCustomerCd', 'customerName', 'customerGroupCd', 'customerGroupName',
      'contractCd', 'neosItemName', 'serialCd', 'modelNumber',
      'contractStatusName', 'serviceStatus', 'customerStateName', 'customerBranchName',
      'statusRenewalDate', 'deviceStatus', 'idmRemoteDate', 'firmwareVersion'
    ];
    this.checkColumnList = [
      this._translationService.instant('CONTENT.MENU.COMMON.INDEX'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CUSTOMER_CD'), 
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CUSTOMER_NAME'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CUSTOMER_GROUP_CD'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CUSTOMER_GROUP_NAME'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CONTRACT_CD'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CONTRACT_ITEM_NAME'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.SERIAL_NUM'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.TERMINAL_MODEL_NUMBER'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.CONTRACT_STATUS'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.TERMINAL_AVAILABLITY'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.PREFECTURES'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.BRANCH'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.DEVICE_UPDATE_DATE'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.DEVICE_STATUS'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.REMOTE_DATE'),
      this._translationService.instant('CONTENT.MENU.IOTMANAGER.IOTMANAGER_DEVICE_LIST.FIRMWARE_VERSION')
    ];
    this.delColumnList = ['active', 'childStatus', 'comconfig', 'enable', 'error', 'factory', 'idmInfo', 'replace', 'sync'];
  }
  ngOnDestroy(): void {
    // console.log('onDestory');
    this.checkData = false;
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.checkData = false;
    // this._iotManagerService.onCheckListComplete$ = new BehaviorSubject(null);
    // this._iotManagerService.onCheckListComplete$.pipe(takeUntil(this._unsubscribeAll), takeLast(1)).subscribe(
    //   res => {
    //     if (res) {
    //       if (this.dataList.length > 0) {
    //         this._commonService.dataReleaseProcessPop(this.dataList);
    //       }
    //       this.dataList = res;
    //       this.checkData = true;
    //     }
    //   }
    // );

    // this._iotManagerService[`${this.itemNav.id}$`].pipe(takeUntil(this._unsubscribeAll)).subscribe(
    //   searchModel => { // searchModel 변경시 반응
    //     this.searchFields = new SearchIotManagerModel(searchModel);
    //     const reqParam = this.itemNav.params ? { firstLevelCd: this.itemNav.params.firstLevelCd, secondLevelCd: this.itemNav.params.secondLevelCd } : null;
    //     this._iotManagerService.getCheckedList(reqParam, this.searchFields);
    //   }
    // );
  }

  csvDownload(): void {
    // if (this.dataDownloadList.length > 0) {
    //   this._commonService.dataReleaseProcessPop(this.dataDownloadList);
    // }
    if (this.dataList.length > 0) {
      console.log(this.dataList);
      this.dataList.forEach(element => {
        // tslint:disable-next-line: forin
        for (const item in element) {
          for (const key in this.delColumnList) {
            if (item === this.delColumnList[key]) {
              delete element[item];
              break;
            } else {
              continue;
            }
          }
          if (item === 'time') {
            element[item] = this._datePipe.transform(new Date(element['time']), 'yyyy-MM-dd HH:mm:ss');
          }

          const keyIndex = this.checkColumnOrgList.findIndex((cmpItem) => {
            return item === cmpItem;
          });
          if (keyIndex !== -1) {
            if (this.checkList[keyIndex] === false) {
              delete element[item];
            }
          }
        }
        const addData = {};
        for (let count = 0; count < this.checkList.length; count++) {
          if (this.checkList[count] === true) {
            addData[this.checkColumnOrgList[count]] = element[this.checkColumnOrgList[count]];
            if (this.checkColumnOrgList[count] === 'idx') {
              addData['idx'] = this.dataDownloadList.length + 1;
            }
          }
        }
        this.dataDownloadList.push(addData);
      });

      const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'USEN IoT Device List Report CSV',
        useBom: true,
        noDownload: false,
        headers: this.createHeader()
      };
      const fileName = this._datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') + '_Usen_Report';
      // tslint:disable-next-line: no-unused-expression
      // if (options.headers.length > 0) {
      //   const csv = new ngxCsv(this.dataDownloadList, fileName, options);
      // } else {
        
      // }
    }
  }

  createHeader(): string[] {
    const headers = [];
    for (let count = 0; count < this.checkList.length; count++) {
      if (this.checkList[count]) {
        headers.push(this.checkColumnList[count]);
      }
    }
    return headers;
  }

  onCloseClick(): void {
    // this._iotManagerService.releaseProcess();
    // this._commonService.dataReleaseProcessPop(this.dataList);
    // this._commonService.dataReleaseProcessPop(this.dataDownloadList);
    this.dialogRef.close();
  }
}
