import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tokenization-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {
    }
    internal() {
        location.href = "tokenization/internal";
    }
    external() {
        location.href = "tokenization/external";
    }
}
