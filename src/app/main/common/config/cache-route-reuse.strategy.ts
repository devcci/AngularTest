import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
export class CacheRouteReuseStrategy implements RouteReuseStrategy {
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
    allowRetriveCache = {
        'sample': true
    };
    handlers: {[key: string]: DetachedRouteHandle} = {};

    shouldReuseRoute(before: ActivatedRouteSnapshot, curr:  ActivatedRouteSnapshot): boolean { //  현재 라우팅의 스탭샷을 향후 라우팅에 사용할 수 있는지 여부를 확인
        if (curr.routeConfig && this.allowRetriveCache.hasOwnProperty(curr.routeConfig.path)) {
            return true;
        }
        return before.routeConfig === curr.routeConfig;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {// 현재 경로의 스탭샷이 있는지 확인. true를 반환하면 저장소에서 스냅샷을 로드한다
        const path = this.getPath(route);
        if (this.allowRetriveCache[this.getPath(route)]) {
            return this.storedRouteHandles.has(this.getPath(route));
        }
        return false;
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean { // 다른 Url로 이동하기 전 현재 URL 및 관련 정보를 저장할 지 결정.
        const path = this.getPath(route);
        if (this.allowRetriveCache.hasOwnProperty(path)) {
            return true;
        }
        return false;
    }

    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void { // shouldDetach가 true를 반환하면 호출 되어 현재 상태를 저장
        this.storedRouteHandles.set(this.getPath(route), detachedTree);
    }

    private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
        return route.routeConfig.path;
    }
    return '';
    }
}
