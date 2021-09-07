import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AssetTypes, IssuerWalletRoles } from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-lock-issuer-wallet',
    templateUrl: './lock-issuer-wallet.component.html',
    styleUrls: ['./lock-issuer-wallet.component.scss'],
})
export class LockIssuerWalletComponent implements OnInit {
    seedId: string;
    issuerWalletId: string;
    passphrase: string;

    AssetTypes = AssetTypes;
    IssuerWalletRoles = IssuerWalletRoles;
    allowedAssetTypes = [AssetTypes.ALGO, AssetTypes.XLM];

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.seedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
        });
    }

    submit() {
    }
}
