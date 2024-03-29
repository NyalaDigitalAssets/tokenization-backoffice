import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() title: string;
    @Input() subTitle?: string;
    @Input() icon?: string;
    @Input() content?: string;
    @Input() showBack = true;

    constructor(private location: Location) {}

    goBack() {
        this.location.back();
    }
}
