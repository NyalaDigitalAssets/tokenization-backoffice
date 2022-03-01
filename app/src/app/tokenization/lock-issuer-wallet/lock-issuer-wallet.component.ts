import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IssuerWalletRoles, SimpleAccessCredentialsDto } from '../../core/models';
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
    IssuerWalletRoles = IssuerWalletRoles;

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
        this.customApi
            .postTokenizedAssetsLockIssuerWallet(
                this.seedId,
                this.issuerWalletId,
                new SimpleAccessCredentialsDto({ passphrase: this.passphrase })
            )
            .subscribe({
                next: () => this.router.navigate(['tokenization']),
            });
    }
}
