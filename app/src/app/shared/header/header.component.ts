import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() title: string;
    @Input() subTitle?: string;
    @Input() icon?: string;
    @Input() content?: string;

    constructor(private location: Location) {}

    ngOnInit(): void {}

    goBack() {
        this.location.back();
    }
}
