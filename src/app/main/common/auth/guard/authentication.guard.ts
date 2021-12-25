import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot,  Route, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import { MediatorService } from '../../service/mediator.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseConfigService } from '@fuse/services/config.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
              private _authService: AuthenticationService,
              private _router: Router,
              private _navService: FuseNavigationService,
              private _mdService: MediatorService,
              private _fuseConfigService: FuseConfigService,
              ) {  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoginAndRedirect(state);
  }

  checkLoginAndRedirect(state): boolean {
    if (this._authService.getJwtToken()) { // 토큰의 존재 유무로 판단
      if (this._navService.getNavigationItemByPath(state.url)) {
        const navInfo = this._navService.getNavigationItemByPath(state.url);
        this._mdService.menuTitle.next(navInfo.translate);
        this._mdService.currentNavInfo$.next(navInfo);
      } else {
        const urlArr = state.url.substring(0, state.url.indexOf('?') > -1 ? state.url.indexOf('?') : state.url.length).split('/'); // 파라미터를 제외한 url을 '/'기준으로 나눈다
        while (!this._navService.getNavigationItemByPath(urlArr.join('/'))) { // 네비게이션에 선택할 메뉴를 찾아낸다.
          if (urlArr.length === 0) {
            break;
          }
          urlArr.pop();
        }
        if (this._navService.getNavigationItemByPath(urlArr.join('/'))) {
          const navInfo = this._navService.getNavigationItemByPath(urlArr.join('/'));
          this._mdService.menuTitle.next(navInfo.translate);
          this._mdService.currentNavInfo$.next(navInfo);
        } else {
          this._router.navigateByUrl(state.url, {skipLocationChange: true}).then(() =>
          this._router.navigate(['login'], {queryParams: {redirectTo: state.url, authenticated: true}}));
        }
      }
      return true;
    } else {
      this._authService.clearJwtToken();
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('jwt_refreshToken');
      this._router.navigateByUrl(state.url, {skipLocationChange: true}).then(() =>
      this._router.navigate(['login'],  { queryParams: { redirectTo: state.url, authenticated: false}}));
        
      this._fuseConfigService.config = { // Configure the layout
        layout: {
            navbar   : {
                hidden: true
            },
            toolbar  : {
                hidden: true
            },
            footer   : {
                hidden: true
            },
            sidepanel: {
                hidden: true
            }
        }
      };
    }
  }
}
