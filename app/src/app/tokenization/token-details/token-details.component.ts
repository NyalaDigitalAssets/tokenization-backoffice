import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AssetTypes, TokenizedAssetDetailsDto } from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';
import { CustomApiService } from '../../core/services/ganymede.service';

interface KeyValue {
    key: string;
    value: object;
}

@Component({
    selector: 'app-token-details',
    templateUrl: './token-details.component.html',
    styleUrls: ['./token-details.component.scss'],
})
export class TokenDetailsComponent implements OnInit {
    tokenDetailsColumns = ['key', 'value'];
    transferColumns = ['created', 'txId', 'fromAddress', 'toAddress', 'amount'];
    optInColumns = [];

    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    tokenizedAsset: TokenizedAssetDetailsDto;
    tokenDetails: KeyValue[];

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private assetTypeUtility: AssetTypeUtilityService,
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

    showInBlockchainExplorer(txId: string) {
        const url = `${this.assetTypeUtility.txUrl(AssetTypes.XLM)}/${txId}`;
        window.open(url, '_blank');
    }

    sendTokens() {}

    private loadTokenDetails() {
        this.customApi
            .getTokenizedAssetsGetTokenizedAssetDetails(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId
            )
            .subscribe((response) => {
                this.tokenizedAsset = response.data;
                this.tokenDetails = this.getTokenDetails(response.data);
            });
    }

    private getTokenDetails(tokenizedAsset: TokenizedAssetDetailsDto): KeyValue[] {
        const relevantProps = ['assetId', 'name', 'unitName', 'totalSupply', 'decimals', 'url'];
        const details: KeyValue[] = [];

        for (const prop in this.tokenizedAsset) {
            if (
                Object.prototype.hasOwnProperty.call(tokenizedAsset, prop) &&
                relevantProps.indexOf(prop) !== -1
            ) {
                const element = this.tokenizedAsset[prop];
                details.push({ key: prop, value: element });
            }
        }

        return details;
    }
}
