import {Component} from '@angular/core';

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {TranslateService} from '@ngx-translate/core';
import {TestService} from '../common/service/test.service';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param _translationService
     * @param testService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translationService: TranslateService,
        private testService: TestService
    ) {
        // this._fuseTranslationLoaderService.loadTranslations(english, turkish, korean);
        this._translationService.use('en');
        console.log('캉캉', this._translationService.instant('NAV.SAMPLE.TITLE'));

        console.log(this.testService.getStr().subscribe(data => {
            console.log(data);
        }));
    }
}
