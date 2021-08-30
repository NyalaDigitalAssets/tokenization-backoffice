import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    headerContent: string;

    constructor() {}

    ngOnInit(): void {
      this.headerContent = `Please verify the following things in case the chain icon <i class="fa fa-fw fa-link"></i> doesn't appear on the top right corner.`;
    }
}
