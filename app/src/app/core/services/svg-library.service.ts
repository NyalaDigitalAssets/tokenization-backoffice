import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SVGLibraryService {
    svgIcons: Array<{ category: string; icons: Array<string> }> = [
        {
            category: 'crypto-asset',
            icons: [
                'xlm',
                'btc',
                'eth',
                'xtz',
                'link',
                'cro',
                'omg',
                'bat',
                'comp',
                'dai',
                'snx',
                'eos',
                'ltc',
                'aave',
                'dot',
                'ksm',
                'algo',
                'matic'
            ],
        }
    ];

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

    init() {
        this.svgIcons.forEach((cat) => {
            cat.icons.forEach((icon) => {
                this.matIconRegistry.addSvgIcon(
                    `${cat.category}_${icon}`,
                    this.domSanitizer.bypassSecurityTrustResourceUrl(
                        `../assets/img/svg_library/${cat.category}/${cat.category}_${icon}.svg`
                    )
                );
            });
        });
    }
}
