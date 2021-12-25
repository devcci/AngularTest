import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'CONTENT.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'organization',
                title: 'CONTENT.MENU.ORG',
                translate: 'CONTENT.MENU.ORG',
                type: 'collapsable',
                children: [
                    {
                        id: 'organization',
                        title: 'CONTENT.MENU.ORG',
                        translate: 'CONTENT.MENU.ORG',
                        type: 'item',
                        icon: 'email',
                        url: '/org'
                    },
                    {
                        id: 'user',
                        title: 'CONTENT.MENU.USER',
                        translate: 'CONTENT.MENU.USER',
                        type: 'item',
                        icon: 'email',
                        url: '/user'
                    }
                ]
            }
        ]
    }
];
