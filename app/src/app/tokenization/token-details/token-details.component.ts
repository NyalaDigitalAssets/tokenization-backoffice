import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { forkJoin } from 'rxjs';

import {
    AssetTypes,
    CustomerRetailWalletDto,
    ITokenizedAssetDetailsDto,
    OptInStatus,
    RetailWalletAccessLevels,
    ToggleOptInAuthorizationDto,
    TokenizedAssetDetailsDto,
    TokenizedAssetOptInDto,
    TokenizedAssetTransferDto,
    TransactionActions,
} from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';
import { CustomApiService } from '../../core/services/ganymede.service';

interface KeyValue {
    key: string;
    value: object;
    showCopy: boolean;
}

export class TokenizedAssetOptInDtoExtended extends TokenizedAssetOptInDto {
    isSelected?: boolean;
    customerName?: string;
    isLoading?: boolean;
    walletAccess?: RetailWalletAccessLevels;
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

    @ViewChild('optInPaginator', { static: false }) optInPaginator: MatPaginator;
    optInColumns = ['name', 'walletAccess', 'created', 'txs', 'status', 'modified', 'actions'];
    optInDataSource = new MatTableDataSource<TokenizedAssetOptInDtoExtended>();
    optInsAllSelected = false;
    optInsAnySelected = false;
    optInSelectedCount = 0;

    tokenDetailsColumns = ['key', 'value'];
    tokenDetails = new MatTableDataSource<KeyValue>();

    @ViewChild('transferPaginator', { static: false }) transferPaginator: MatPaginator;
    transferColumns = ['created', 'txId', 'fromAddress', 'toAddress', 'amount'];
    transferDataSource = new MatTableDataSource<TokenizedAssetTransferDto>();

    tokenizedAsset: ITokenizedAssetDetailsDtoExtend;
    model = new ToggleOptInAuthorizationDto();
    isOptInAuthorizeCall = false;
    hasTomlSupport = false;

    OptInStatus = OptInStatus;
    TransactionActions = TransactionActions;
    RetailWalletAccessLevels = RetailWalletAccessLevels;

    @ViewChild(MatSort, { static: false }) optInSort: MatSort;
    @ViewChild('pwdDialog', { static: true }) pwdDialog: TemplateRef<any>;

    constructor(
        private customApi: CustomApiService,
        private activatedRoute: ActivatedRoute,
        private assetTypeUtility: AssetTypeUtilityService,
        private router: Router,
        private dialog: MatDialog,
        private ngxCsvParser: NgxCsvParser
    ) {}

    ngAfterViewInit() {
        this.optInDataSource.paginator = this.optInPaginator;
        this.optInDataSource.sort = this.optInSort;
        this.transferDataSource.paginator = this.transferPaginator;

        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;
            this.loadTokenDetails();
        });
    }

    showTxInBlockchainExplorer(txId: string) {
        const url = `${this.assetTypeUtility.txUrl(AssetTypes.XLM)}/${txId}`;
        window.open(url, '_blank');
    }

    showAddressInBlockchainExplorer(address: string) {
        const url = `${this.assetTypeUtility.addressUrl(AssetTypes.XLM)}/${address}`;
        window.open(url, '_blank');
    }

    showCustomerWallets(customerId: string) {
        this.router.navigate(['customer', customerId, 'retail-wallets']);
    }

    isTokenBurnSupported () {
        return this.tokenizedAsset?.assetType === AssetTypes.XLM;
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

    burnTokens() {
        this.router.navigate([
            'tokenization',
            this.issuerWalletSeedId,
            'issuer-wallets',
            this.issuerWalletId,
            'tokens',
            this.tokenizedAssetId,
            'burn',
        ]);
    }

    clawbackTokens() {
        this.router.navigate([
            'tokenization',
            this.issuerWalletSeedId,
            'issuer-wallets',
            this.issuerWalletId,
            'tokens',
            this.tokenizedAssetId,
            'clawback',
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

    unselectAll() {
        this.tokenizedAsset.optIns.forEach((o) => {
            o.isSelected = false;
        });
        this.checkSelections();
    }

    csvInputChange(fileInputEvent: any) {
        this.ngxCsvParser
            .parse(fileInputEvent, { header: false, delimiter: ',' })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    this.tokenizedAsset.optIns.forEach((o) => {
                        o.isSelected = false;
                    });
                    result.forEach((row) => {
                        const optInId = row[0];
                        const optIn = this.tokenizedAsset.optIns.find((o) => o.id === optInId);
                        if (optIn) {
                            optIn.isSelected = true;
                        }
                    });
                    this.checkSelections();
                },
                (error) => {
                    console.error('Error', error);
                }
            );
    }

    downloadSelectionCustomerCSV() {
        const rows = this.tokenizedAsset.optIns.map((o) => `${o.id},${o.customerName}`);
        const data = rows.join('\r\n');
        const a = document.createElement('a');
        a.download = 'opt-in-selection.csv';
        a.href = `data:text/csv;charset=UTF-8,\ufeff${data}`;
        a.target = '_blank';
        a.click();
    }

    checkSelections() {
        this.optInsAllSelected = this.getOptInAllSelected();
        this.optInsAnySelected = this.getOptInAnySelected();
        this.optInSelectedCount = this.tokenizedAsset.optIns.filter((o) => o.isSelected).length;
    }

    showOptInDialog(isOptInAuthorizeCall: boolean) {
        this.dialog.open(this.pwdDialog);
        this.isOptInAuthorizeCall = isOptInAuthorizeCall;
    }

    submitOptIns() {
        this.model.customerRetailWalletIds = this.tokenizedAsset.optIns
            .filter((o) => o.isSelected)
            .map(
                (o) =>
                    new CustomerRetailWalletDto({
                        retailWalletId: o.retailWalletId,
                        customerId: o.customerId,
                    })
            );

        const q = this.isOptInAuthorizeCall
            ? this.customApi.postTokenizedAssetsAuthorizeOptIn(
                  this.issuerWalletSeedId,
                  this.issuerWalletId,
                  this.tokenizedAssetId,
                  this.model
              )
            : this.customApi.postTokenizedAssetsRevokeOptIn(
                  this.issuerWalletSeedId,
                  this.issuerWalletId,
                  this.tokenizedAssetId,
                  this.model
              );

        q.subscribe(() => {
            this.model = new ToggleOptInAuthorizationDto();
            this.dialog.closeAll();
            this.tokenizedAsset.optIns
                .filter((o) => o.isSelected)
                .forEach((o) => (o.isLoading = true));
        });
    }

    loadTokenDetails() {
        forkJoin([
            this.customApi.getCustomerGetCustomers(),
            this.customApi.getTokenizedAssetsGetTokenizedAssetDetails(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId,
            ),
        ]).subscribe((response) => {
            const customers = response[0].data;
            this.tokenizedAsset = response[1].data;
            this.tokenizedAsset.optIns.forEach((o) => {
                const customer = customers.find((c) => c.id == o.customerId);
                o.customerName = customer
                    ? `${customer.firstname} ${customer.lastname}`
                    : 'ERROR: Unknown';
                o.walletAccess = customer.walletAccess;
            });
            this.optInDataSource.data = this.tokenizedAsset.optIns;
            this.transferDataSource.data = this.tokenizedAsset.transfers.sort((a, b) =>
                a.created > b.created ? -1 : 1
            );
            this.tokenDetails.data = this.getTokenDetails(response[1].data);
            this.hasTomlSupport = this.tokenizedAsset.assetType === AssetTypes.XLM;
        });
    }

    private getTokenDetails(tokenizedAsset: TokenizedAssetDetailsDto): KeyValue[] {
        const relevantProps = [
            'id',
            'assetId',
            'name',
            'unitName',
            'totalSupply',
            'decimals',
            'reviewDecision',
            'reviewer',
            'reviewedAt',
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
                details.push({ key: prop, value: element, showCopy: prop === 'id' });
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