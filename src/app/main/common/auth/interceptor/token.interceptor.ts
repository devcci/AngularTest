import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; import { catchError } from 'rxjs/operators'; 

@Injectable()
export class TokenInterceptor implements HttpInterceptor { 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

        let request: HttpRequest<any>; request = req.clone({ 
            setHeaders: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` } 
        }); 

        // 예외처리 - 로그인
        // if ((request.method === 'POST') && (request.url.indexOf('/api/login') > -1)) {
        //     return next.handle(req);
        // }

        // 예외처리 - 토큰 갱신
        if ((request.method === 'POST') && (request.url.indexOf('/api/token') > -1)) {
            request = req.clone({ 
                setHeaders: { Authorization: `Bearer ${localStorage.getItem('jwt_refreshToken')}` } 
            });
            
        }

        return next.handle(request).pipe( 
            catchError(e => { /** * 여기서 Error 원하는 방식으로 에러를 처리 */ 
                return throwError(e); 
            }) 
        );
    } 
}
