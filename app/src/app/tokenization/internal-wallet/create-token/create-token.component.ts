import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InitTokenizedAssetCreationDto, IssuerWalletDto, IssuerWalletRoles } from '../../../core/models';
import { CustomApiService } from '../../../core/services/ganymede.service';

@Component({
    selector: 'app-create-token',
    templateUrl: './create-token.component.html',
    styleUrls: ['./create-token.component.scss'],
})
export class CreateTokenComponent implements OnInit {
    seedId: string;
    issuerWalletId: string;
    model = new InitTokenizedAssetCreationDto();
    issuerWallets: IssuerWalletDto[];
    formReady: boolean;
    IssuerWalletRoles = IssuerWalletRoles;

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.seedId = params.seedId;
            this.loadWallets();
        });
    }

    getIssuerWallets(): IssuerWalletDto[] {
        return this.issuerWallets.filter((iw) => iw.role === IssuerWalletRoles.Issuer);
    }

    getDistributorWallets() {
        if (!this.issuerWalletId) {
            return [];
        }

        const issuerWallet = this.issuerWallets.find((i) => i.id === this.issuerWalletId);

        return this.issuerWallets.filter(
            (iw) =>
                iw.role === IssuerWalletRoles.Distributor && iw.blockchain === issuerWallet.blockchain
        );
    }

    submit() {
        this.model.enableClawback = true;
        this.model.enableFreeze = true;
        this.customApi
            .postTokenizedAssetsInitializeTokenizedAssetCreation(
                this.seedId,
                this.issuerWalletId,
                this.model
            )
            .subscribe(() => this.router.navigate(['tokenization', 'internal']));
    }

    private loadWallets() {
        this.formReady = false;
        this.customApi.getIssuerWalletGetIssuerWallets(this.seedId).subscribe((response) => {
            this.issuerWallets = response.data;
            this.formReady = true;
        });
    }
}
