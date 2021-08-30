import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenizedAssetDetailsDto } from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-token-details',
    templateUrl: './token-details.component.html',
    styleUrls: ['./token-details.component.scss'],
})
export class TokenDetailsComponent implements OnInit {

    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    tokenizedAsset: TokenizedAssetDetailsDto;

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;

            this.loadTokenDetails();
        });
    }

    sendTokens(){
      
    }

    private loadTokenDetails() {
        this.customApi
            .getTokenizedAssetsGetTokenizedAssetDetails(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId
            )
            .subscribe((response) => {
                this.tokenizedAsset = response.data;
            });
    }
}
