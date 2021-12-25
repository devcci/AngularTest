import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
    providedIn: 'root'
  })
  export class MediatorService {

    private _isAuthenticated: boolean; // 인증 여부
    set isAuthenticated(value: any) {
        this._isAuthenticated = value;
    }
    get isAuthenticated(): any {
        return this._isAuthenticated;
    }

    // authInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null); // 로그인한 사용자 정보
    // authInfo = new Subject();
    // authInfo$ = this.authInfo.asObservable();

    onListChanged$: BehaviorSubject<any>;
    


    authInfo$ = new BehaviorSubject<any>(null);
    // authInfo$: Observable<any>;

    menuTitle: any = new BehaviorSubject<string>(null);

    currentNavInfo = new BehaviorSubject<any>(null);
    currentNavInfo$: BehaviorSubject<any>;

    constructor() {
      // this.authInfo$ = this.authInfo.asObservable();
      this.authInfo$ = new BehaviorSubject({});
      this.currentNavInfo$ = new BehaviorSubject(null);

    }

    

}
