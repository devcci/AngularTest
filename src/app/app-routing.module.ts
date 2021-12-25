import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuseModule } from '@fuse/fuse.module';
import { fuseConfig } from './fuse-config';
import { SampleComponent } from './main/sample/sample.component';
import { TranslateModule } from '@ngx-translate/core';

const appRoutes: Routes = [ 
    {
        path      : '',
        redirectTo: 'sample',
        pathMatch: 'full'
    },
    {
        path      : 'sample',
        // component : SampleComponent
        loadChildren: () => import('./main/sample/sample.module').then(m => m.SampleModule),
    },
    {
        path: 'org',
        loadChildren: () => import('./main/menu/org/org.module').then(m => m.OrgModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./main/menu/user/user.module').then(m => m.UserModule)
    },
    {
        path      : '**',
        redirectTo: 'sample'
    }
];

@NgModule({
    imports: [
      FuseModule.forRoot(fuseConfig),
      // 기본 라우트 설정
      RouterModule.forRoot(appRoutes, {enableTracing: false, useHash: true}),
    //   LoginModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }