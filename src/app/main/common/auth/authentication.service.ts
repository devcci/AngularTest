import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { ApiService } from '../service/api.service';
import { MediatorService } from '../service/mediator.service';
import { Router } from '@angular/router';

declare var $: any;

export interface LoginUser
{
    id: string;
    password: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

  public tokenRefresher;

  constructor(
      private _apiService: ApiService,
      private _mdService: MediatorService,
      private _router: Router
  ) {
      this.tokenChecker();
  }

    ///////////////////////////
    /*    로그인 관련 함수   */
    ///////////////////////////
  tokenChecker(): void {
    console.log('Token checker');
    
      const currTime = +new Date().getTime();
      const expTime = +this.getExpTime() * 1000;
      if (currTime > expTime) { // 토큰 만료후 접근 시, > login 페이지로 이동
        
        // console.log('토큰 만료 후 접근', new Date(currTime), new Date(expTime));
        this.clearJwtToken();
        this.clearJwtRefreshToken();
        this.setExpTime(null);
        this._router.navigate(['/login']);
      }
      
      if (expTime - currTime < 600000 && this.getJwtToken()) { // 만료 시간 도달 10분 이내 (600000ms)> 세션 갱신
        this._apiService.post('token', '', null).subscribe(
          token => {
            this.setJwtToken(token['token']);
            this.setJwtRefreshToken(token['refreshtoken']);
            this.setExpTime(jwt_decode(token['token']).exp); 
        });
      }
    this.tokenRefresher = setTimeout(() => {
      this.tokenChecker();
    }, 590000);
  }

  getJwtToken(): any {
    return localStorage.getItem('jwt_token');
  }

  setJwtToken(token): void {
    localStorage.setItem('jwt_token', token);
  }

  getExpTime(): any {
    return localStorage.getItem('exp_time');
  }

  setExpTime(time): any {
    localStorage.setItem('exp_time', time);
  }

  getLanguage(): any {
    return localStorage.getItem('language');
  }

  setLanguage(lang): any {
    localStorage.setItem('language', lang);
  }

  getJwtRefreshToken(): any {
    return localStorage.getItem('jwt_refreshToken');
  }

  setJwtRefreshToken(refreshToken): void {
      localStorage.setItem('jwt_refreshToken', refreshToken);
  }

  clearJwtToken(): void {
    localStorage.removeItem('jwt_token');
  }

  clearJwtRefreshToken(): void {
    localStorage.removeItem('jwt_refreshToken');
  }

  setOrgName(orgName): void {
    localStorage.setItem('orgName', orgName);
  }

  getOrgName(): any {
    return localStorage.getItem('orgName');
  }

  setOrgImgP(orgImgPath): void {
    localStorage.setItem('orgImgPath', orgImgPath);
  }

  getOrgImgPath(): any {
    return localStorage.getItem('orgImgPath');
  }

  setPwTobeChanged(pwTobeChanged): any {
    localStorage.setItem('pwTobeChanged', pwTobeChanged);
  }

  getPwTobeChanged(): any {
    return localStorage.getItem('pwTobeChanged');
  }

  setAccountImageInfo(accountImagePath, accountImagePreset, accountImageType): void {
    localStorage.setItem('accountImagePath', accountImagePath);
    localStorage.setItem('accountImagePreset', accountImagePreset);
    localStorage.setItem('accountImageType', accountImageType);
  }

  getAccountImageInfo(): any {
    const accountImageInfo = {
      accountImagePath: localStorage.getItem('accountImagePath'),
      accountImagePreset: localStorage.getItem('accountImagePreset'),
      accountImageType: localStorage.getItem('accountImageType')
    };

    return accountImageInfo;
  }

  getRememberMe(): boolean {
    const rememberMe = localStorage.getItem('rememberMe');
    if (!rememberMe || (rememberMe === '') || (rememberMe === 'false')) {
      return false;
    } else {
      return true;
    }
  }

  setRememberMe(rem): void {
    localStorage.setItem('rememberMe', rem);
  }

  getRemId(): any {
    return localStorage.getItem('remId');
  }
  setRemId(remId): void {
    localStorage.setItem('remId', remId);
  }

  getMyAccountInfo(): void {
    if (this.getLoginData()) {
      this._apiService.get('account', `${this.getLoginData().id}/myinfo`, null).subscribe(
        res => {
          this._mdService.authInfo$.next(res);
        },
        err => {
          this._apiService.makeNotification(err);
        }
      );
    }
  }

  checkTokenValidation(): Observable<any> {
    if (!this.getLoginData()) {
      return new BehaviorSubject(null);
    }
    return this._apiService.get('account', `${this.getLoginData().id}/myinfo`, null);
  }

  getLoginData(): any {
    let loginData = null;
    const token = this.getJwtToken();

    if (token) {
        const decoded = jwt_decode(token); 

        this.setExpTime(decoded.exp);
        decoded.authLevel = {};
        if (!decoded || !decoded.loginData) {
            return decoded;
        }
        loginData = JSON.parse(decoded.loginData);
        loginData.isAccessLevel = function (accessLevel): boolean {
          if (this.commonFunc.isEmpty(this.userid) || this.commonFunc.isEmpty(this.level)) {
            return false;
          }
          if (!this.commonFunc.isEmpty(accessLevel) && this.level >= accessLevel) { // accessLevel 미만인경우
            return true;
          }
          return false;
        };

        loginData.checkPageAuth = function (accessLevel): any {
            let isPass = false;
            if (this.commonFunc.isEmpty(this.userid) || this.commonFunc.isEmpty(this.level)) { // 아이디 및 레벨 정보가 없는 경우
                $('body').empty();
                location.href = '/login.html';
                return;
            }
            if (!this.commonFunc.isEmpty(accessLevel) && this.level >= accessLevel) { // accessLevel 미만인경우
                isPass = true;
            }

            if (!isPass) {
                $('body').empty();
                location.href = '/';
            }
        };
    }
    return loginData;
  }

  login(user: LoginUser): void {
    this._apiService.post('login', '', user).subscribe(
      response => {
        this._mdService.authInfo$.next(response);
        this._mdService.isAuthenticated = true;
      },
      err => {       
        this._apiService.makeNotification(err);
        console.log('Login Failed', err);
      }
    );
  }
}
