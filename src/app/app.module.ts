import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './main/common/auth/interceptor/token.interceptor';
import { AuthenticationService } from './main/common/auth/authentication.service';
import { RouteReuseStrategy } from '@angular/router';
import { AuthenticationGuard } from './main/common/auth/guard/authentication.guard';
import { CacheRouteReuseStrategy } from './main/common/config/cache-route-reuse.strategy';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        TranslateModule.forRoot({
            defaultLanguage: 'en'
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // NgZorroAntd
        NgZorroAntdModule,

        // App modules
        LayoutModule,
        // LoginModule,

        // Router Module
        AppRoutingModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers   : [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
            deps: [AuthenticationService]
        },
        {
            provide: RouteReuseStrategy,
            useClass: CacheRouteReuseStrategy
        },

        AuthenticationGuard,
        DatePipe
    ]
})
export class AppModule
{
}
