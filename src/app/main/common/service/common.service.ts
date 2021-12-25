import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }  

  removeInvalidValue(obj, rmList = []): any {
    const copyObj = Object.assign({}, obj);
    for (const prop in copyObj) { // 각 배열을 풀어서 그 안의 property들을 순회
      if (copyObj.hasOwnProperty(prop)) {
        const target = copyObj[prop];
        if ((target === undefined) || (target === null) || (rmList.indexOf(prop) > -1)) { // null or undefined or '' 일 시, 해당 프로퍼티 제거
          delete copyObj[prop];
        }
      }
    }
    return copyObj;
  }

  setOptParams(...obj): HttpParams {
    let params = new HttpParams();
    for (let i = 0; i < arguments.length; i++) {
      for (const item in arguments[i]) {
        if (arguments[i].hasOwnProperty(item)) {
          params = params.append(`${item}`, arguments[i][item]);
        }
      }
    }
    return params;
  }

  downloadCSV(name: string, data: any, type: string): any {
    if (data != null && navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], { type: type }), name);
    }
    const a = $('<a style="display: none;"/>');
    const url = window.URL.createObjectURL(new Blob([data], { type: type }));
    a.attr('href', url);
    a.attr('download', name);
    $('body').append(a);
    a[0].click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  makeTableSrchParams(paramOpts, searchOpts, pageOpts, sortOpts): HttpParams {
    let params = new HttpParams();
    for (const opt in this.removeInvalidValue(paramOpts)) { // 각 배열을 풀어서 그 안의 property들을 순회
      if (paramOpts.hasOwnProperty(opt)) { // item이 존재 한다면,
        params = params.append(opt, paramOpts[opt]);
      }
    }
    for (const opt in this.removeInvalidValue(searchOpts)) { // 각 배열을 풀어서 그 안의 property들을 순회
      if (searchOpts.hasOwnProperty(opt)) { // item이 존재 한다면,

        if (searchOpts[opt].length) { // multiCheck
          console.log('뭐가 들어오는데?', opt, searchOpts[opt]);
          searchOpts[opt].value = searchOpts[opt].filter(multiCheckModel => multiCheckModel.value).map(multiCheckModel => multiCheckModel.id);
        } else {
          switch (searchOpts[opt].type) {
            case 'text':
              // params = params.append(opt, searchOpts[opt].value);
              break;

            default:
              break;
          }

        }
        params = params.append(opt, searchOpts[opt].value);
      }
    }
    for (const opt in this.removeInvalidValue(sortOpts)) { // 각 배열을 풀어서 그 안의 property들을 순회
      if (sortOpts.hasOwnProperty(opt)) { // item이 존재 한다면,
        params = params.append(opt, sortOpts[opt]);
      }
    }
    params = params.append('page', pageOpts['number']);
    params = params.append('size', pageOpts['size']);
    return params;
  }

  objectsAreSame(x, y): boolean {
    let objectsAreSame = true;
    for (const propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }

  secToDate(secs): any {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  secToString(secs): any {
    const date = new Date(null);
    date.setSeconds(secs); // specify value for SECONDS here
    return date.toISOString().substr(11, 5);
  }

 chkInvalieValue(value): boolean {
   let result = true;
   switch (value) {
     case undefined:
       result = false;
       break;
      case null:
       result = false;
       break;
     default:
       break;
   }
   return result;
 }
}
