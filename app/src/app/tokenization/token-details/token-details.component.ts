import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import {
    AssetTypes,
    ITokenizedAssetDetailsDto,
    ToggleOptInAuthorizationDto,
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
    customerName?: string;
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
    private issuerWalletSeedId: string;
    private issuerWalletId: string;
    private tokenizedAssetId: string;

    optInColumns = ['nr', 'name', 'txId', 'confirmed', 'actions'];
    optInDataSource = new MatTableDataSource<TokenizedAssetOptInDtoExtended>();
    optInsAllSelected = false;
    optInsAnySelected = false;

    tokenDetailsColumns = ['key', 'value'];
    tokenDetails = new MatTableDataSource<KeyValue>();

    transferColumns = ['created', 'txId', 'fromAddress', 'toAddress', 'amount'];

    tokenizedAsset: ITokenizedAssetDetailsDtoExtend;
    model = new ToggleOptInAuthorizationDto();
    isOptInAuthorizeCall = false;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('pwdDialog', { static: true }) pwdDialog: TemplateRef<any>;

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private assetTypeUtility: AssetTypeUtilityService,
        private router: Router,
        private dialog: MatDialog
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

    toggleOptInSelection() {
        const anySelected = this.getOptInAnySelected();
        const allSelected = this.getOptInAllSelected();

        this.tokenizedAsset.optIns.forEach((o) => {
            o.isSelected = !anySelected ? true : allSelected ? false : anySelected;
        });

        this.checkSelections();
    }

    checkSelections() {
        this.optInsAllSelected = this.getOptInAllSelected();
        this.optInsAnySelected = this.getOptInAnySelected();
    }

    showOptInDialog(isOptInAuthorizeCall: boolean) {
        this.dialog.open(this.pwdDialog);
        this.isOptInAuthorizeCall = isOptInAuthorizeCall;
    }

    submitOptIns() {
        this.model.retailWalletIds = this.tokenizedAsset.optIns
            .filter((o) => o.isSelected)
            .map((o) => o.retailWalletId);

        const q = this.isOptInAuthorizeCall
            ? this.customApi.postTokenizedAssetsAuthorizeOptIn(
                  this.issuerWalletSeedId,
                  this.issuerWalletId,
                  this.tokenizedAssetId,
                  this.model
              )
            : this.customApi.postTokenizedAssetsRewokeOptIn(
                  this.issuerWalletSeedId,
                  this.issuerWalletId,
                  this.tokenizedAssetId,
                  this.model
              );

        q.subscribe((response) => {
            if (response) {
                this.loadTokenDetails();
            }
        });
    }

    private loadTokenDetails() {
        forkJoin([
            this.customApi.getCustomerGetCustomers(),
            this.customApi.getTokenizedAssetsGetTokenizedAssetDetails(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId
            ),
        ]).subscribe((response) => {
            const customers = response[0].data;
            this.tokenizedAsset = response[1].data;
            let index = 0;
            this.tokenizedAsset.optIns.forEach((o) => {
                const customer = customers.find((c) => c.id == o.customerId);
                o.nr = ++index;
                o.customerName = customer
                    ? `${customer.firstname} ${customer.lastname}`
                    : 'ERROR: Unknown';
            });
            this.optInDataSource.data = this.tokenizedAsset.optIns;
            this.tokenDetails.data = this.getTokenDetails(response[1].data);
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

    private getOptInAllSelected(): boolean {
        return this.tokenizedAsset.optIns.every((o) => o.isSelected);
    }

    private getOptInAnySelected(): boolean {
        return this.tokenizedAsset.optIns.some((o) => o.isSelected);
    }
}
