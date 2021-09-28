import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import {
    AssetTypes,
    ITokenizedAssetDetailsDto,
    TokenizedAssetDetailsDto,
    TokenizedAssetOptInDto,
} from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';
import { CustomApiService } from '../../core/services/ganymede.service';

interface KeyValue {
    key: string;
    value: object;
}

export class TokenizedAssetOptInDtoExtended extends TokenizedAssetOptInDto {
    isSelected?: boolean;
    nr?: number;
}

export interface ITokenizedAssetDetailsDtoExtend extends ITokenizedAssetDetailsDto {
    optIns?: Array<TokenizedAssetOptInDtoExtended>;
}

@Component({
    selector: 'app-token-details',
    templateUrl: './token-details.component.html',
    styleUrls: ['./token-details.component.scss'],
})
export class TokenDetailsComponent implements AfterViewInit {
    tokenDetailsColumns = ['key', 'value'];
    transferColumns = ['created', 'txId', 'fromAddress', 'toAddress', 'amount'];
    optInColumns = ['nr', 'txId', 'confirmed', 'actions'];
    optInDataSource = new MatTableDataSource<TokenizedAssetOptInDto>();

    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    tokenizedAsset: ITokenizedAssetDetailsDtoExtend;
    tokenDetails: KeyValue[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private assetTypeUtility: AssetTypeUtilityService,
        private router: Router
    ) {}

    ngAfterViewInit() {
        this.optInDataSource.paginator = this.paginator;
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

    sendTokens() {
        this.router.navigate([
            'tokenization',
            this.issuerWalletSeedId,
            'issuer-wallets',
            this.issuerWalletId,
            'tokens',
            this.tokenizedAssetId,
            'transfer',
        ]);
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
                this.optInDataSource.data = [];
                let index = 1;
                this.tokenizedAsset.optIns.forEach((o) => {
                    o.nr = index++;
                    this.optInDataSource.data.push(o);
                });
                this.tokenDetails = this.getTokenDetails(response.data);
            });
    }

    private getTokenDetails(tokenizedAsset: TokenizedAssetDetailsDto): KeyValue[] {
        const relevantProps = [
            'assetId',
            'name',
            'unitName',
            'totalSupply',
            'decimals',
            'metaData',
            'url',
        ];
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
