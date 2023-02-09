import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Blockchains, InitTokenizedAssetCreationDto, IssuerWalletDto, IssuerWalletRoles } from '../../../core/models';
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
    showFungibleField = false;

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.seedId = params.seedId;
            this.loadWallets();
        });
        this.model.enableClawback = true;
        this.model.enableFreeze = true;
    }
    issuerWalletChange() {
        var selectedWallet = this.issuerWallets.filter((iw) => iw.role === IssuerWalletRoles.Issuer && iw.id === this.issuerWalletId)[0];
        if (selectedWallet.blockchain === Blockchains.Algorand) {
            this.model.isFungible = true;
            this.showFungibleField = true;
        } else {
            this.model.isFungible = false;
            this.showFungibleField = false;
        }
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
