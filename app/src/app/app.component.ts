import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticatedInstitutionDto } from './core/models';

import { MenuItem } from './core/internal-models/menu-item';
import { CustomApiService } from './core/services/ganymede.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

    loadingIdentity: boolean;
    identity: AuthenticatedInstitutionDto;
    menuItems: MenuItem[];

    constructor(private customApi: CustomApiService) {}

    ngOnInit(): void {
        this.loadIdentity();

        this.menuItems = [
            {
                icon: 'fa-home',
                label: 'Home',
                route: '',
            },
            {
                icon: 'fa-users',
                label: 'Customers',
                route: 'customer',
            },
            {
                icon: 'fa-money-check-alt',
                label: 'Tokenization',
                route: 'tokenization',
            },
        ];
    }

    ngAfterViewInit() {
        this.sidenav.mode = 'over';
        this.sidenav.close();
    }

    private loadIdentity() {
        this.loadingIdentity = true;
        this.customApi.getStatusGetAuth().subscribe(
            (response) => (this.identity = response.data),
            () => {},
            () => (this.loadingIdentity = false)
        );
    }
}
