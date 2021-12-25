import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translationService: TranslateService,
    )
    {
        // this._fuseTranslationLoaderService.loadTranslations(english, turkish, korean);
        this._translationService.use('en');
        console.log('캉캉', this._translationService.instant('NAV.SAMPLE.TITLE'));
    }
}
