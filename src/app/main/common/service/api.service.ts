import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from './common.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _serverApiUrl = ''; // Server Url
  public httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Cache-Control': 'no-cache',
    'Authorization': ''
  });
  public httpOptions = {
    headers: this.httpHeaders
  };

  constructor(
    private _http: HttpClient,
    private _commonService: CommonService,
    private _notification: NzNotificationService,
    private _translationService: TranslateService,
    ) { }

  // get / post / update / delete
  get(url: string = '', params: string = '', searchOpts: any = {}): Observable<{}> {
    const resUrl = `${this._serverApiUrl}/${url}/${params}`;
    return this._http.get<HttpResponse<Object>>(resUrl, {params: searchOpts})
    .pipe(map(response => {
      return response;
    }),
    catchError(this.handleError));
  }

  post(url: string = '', options: string = '', params: any = {}): Observable<{}> {
    const resUrl = `${this._serverApiUrl}/${url}/${options}`;
    const resOptions = this._commonService.setOptParams(params);
    return this._http.post<any>(resUrl, params)
    .pipe(map(response => {
        return response;
    }),
    catchError(this.handleError));
  }

  put(url: string = '', options: string = '', params: any = {}): Observable<{}> {
    const resUrl = `${this._serverApiUrl}/${url}/${options}`;
    return this._http.put<any>(resUrl, params)
    .pipe(map(response => {
        return response;
    }),
    catchError(this.handleError));
  }

  delete(url: string = '', options: string= ''): Observable<{}> {
    const resUrl = `${this._serverApiUrl}/${url}/${options}`;
    return this._http.delete<any>(resUrl, this.httpOptions)
    .pipe(map(response => {
        return response;
    }),
    catchError(this.handleError));
  }

  public setOptParams(obj_1, obj_2): HttpParams {
    let params = new HttpParams();
    for (let i = 0; i < arguments.length; i++) {
      for (const item in arguments[i]) {
        if (arguments[i].hasOwnProperty(item)) {
          params =  params.append(`${item}`, arguments[i][item]);
        }
      }
    }
    return params;
  }

  makeNotification(error): void {
    const mode = 'error';
    const notiObj = this.makeNotiContent(error);
    const title = notiObj.title;
    const message = notiObj.resultStr;
    if (!message) {
      return;
    }
    this._notification.create(`${mode}`, `${title}`, `${message || ''}`);
  }

  makeNotiContent(error): any {
    console.log('error', error);
    let title = 'Error';
    let resultStr = null;
    switch ( error.error ? error.error.message : error.message) {
      case 'InvalidToken':
        title = 'InvalidToken';
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.TOKEN_ERROR'); // 토큰이 만료 되었습니다. 다시 로그인 하세요.
        break;
      case 'ExpiredToken':
        title = null;
        resultStr = null;
        break;

      case 'BAD_REQUEST_PARAM':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.BAD_REQUEST_PARAM'); // API 호출  형식이 잘못되었습니다(UI 호출 잘못함)
        break;
      case 'MISSING_PARAM':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MISSING_PARAM'); // 일부 입력항목이 없습니다 :
        break;
      case 'MDM_APP_GROUP_ALREADY_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_APP_GROUP_ALREADY_EXISTS'); // 해당 이름 또는 application id의 app group이 이미 있습니다.
        break;
      case 'MDM_APP_GROUP_DOES_NOT_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_APP_GROUP_DOES_NOT_EXISTS'); // 입력한 group이 없습니다.
        break;
      case 'MDM_APP_PACKAGE_ALREADY_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_APP_PACKAGE_ALREADY_EXISTS'); // 해당 버전의 app package가 이미 있습니다.
        break;
      case 'MDM_CONFIG_GROUP_ALREADY_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_CONFIG_GROUP_ALREADY_EXISTS'); // 해당 이름의 config group이 이미 있습니다.
        break;
      case 'MDM_CONFIG_GROUP_DOES_NOT_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_CONFIG_GROUP_DOES_NOT_EXISTS'); // 입력한 config group이 없습니다.
        break;
      case 'MDM_CONFIG_ITEM_VERSION_ALREADY_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_CONFIG_ITEM_VERSION_ALREADY_EXISTS'); // 해당 버전의 config 가 이미 있습니다.
        break;
      case 'MDM_CONFIG_ITEM_ID_DOES_NOT_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.MDM_CONFIG_ITEM_ID_DOES_NOT_EXISTS'); // 해당 id의 config item이 없습니다.
        break;
      case 'DEVICETYPE_ITEM_CD_DOES_NOT_EXISTS':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.DEVICETYPE_ITEM_CD_DOES_NOT_EXISTS'); // 해당 계약cd의 계약품목이 없습니다.
        break;
      case 'DOESNOT_EXIST_BY_REQESTED_PARAM':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.DOESNOT_EXIST_BY_REQESTED_PARAM'); // 요청한 값을 찾을 수없습니다
        break;
      case 'ALREADY_EXIST_RESERVED_SCHEDULE':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.ALREADY_EXIST_RESERVED_SCHEDULE'); // 이미 예약된 컨피그 할당이 있습니다. 예약 건을 취소 후 다시 시도하세요.
        break;
      case 'FILE_READ_FAILED':
        resultStr = this._translationService.instant('CONTENT.MENU.COMMON.FILE_READ_FAILED'); // 파일 읽기에 실패하였습니다.
        break;
 
      default:

        switch (error.status) { // 특정되지 않은 오류는 상태에따라 메세지 설정
          case 400:
            resultStr = this._translationService.instant('CONTENT.MENU.COMMON.BAD_REQUEST'); // 입력하신 요청이 잘못 되었습니다.
            break;
          case 500:
            resultStr = this._translationService.instant('CONTENT.MENU.COMMON.SERVER_ERROR'); // 서버에 에러가 발생 하였습니다. 관리자에게 문의하세요.
            break;
          case 403:
            resultStr = this._translationService.instant('CONTENT.MENU.COMMON.FORBIDDEN'); // 권한이 없습니다. 관리자에게 문의하세요.
            break;
          case 401:
            if (error.error.message === 'Authentication Failed. Username or Password not valid.') {
              resultStr = this._translationService.instant('CONTENT.MENU.COMMON.LOGIN_ERROR'); // ID와 비밀번호를 확인 하세요.
            }
            break;
          default:
            break;
        }

        break;
    }
    return {
      'resultStr': resultStr, 
      'title': title
    };
  }

  public handleError(error: HttpErrorResponse): any {
    return throwError(
      error
    );
  }
}
