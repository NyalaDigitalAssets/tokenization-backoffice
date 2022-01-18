import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';

import {
    AssetTypes,
    CancelTransactionsDto,
    TransactionActions,
    TransactionToShowDto,
    TxStatus,
    WalletTypes,
} from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';
import { CustomApiService } from '../../core/services/ganymede.service';

interface TimeValue {
    value: number;
    viewValue: string;
}

class ExtendedResponse extends TransactionToShowDto {
    icon?: string;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
    displayedColumns: string[] = [
        'select',
        'assetType',
        'srcWallet',
        'action',
        'txId',
        'retryCounter',
        'created',
        'modified',
        'status',
    ];

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('cancelDialog', { static: true }) cancelDialog: TemplateRef<any>;

    selection = new SelectionModel<ExtendedResponse>(true, []);

    AssetTypes = AssetTypes;
    WalletTypes = WalletTypes;
    TransactionActions = TransactionActions;
    TxStatus = TxStatus;
    dataSource = new MatTableDataSource<ExtendedResponse>();
    dateOptions: TimeValue[] = [
        { value: 15, viewValue: '15 minutes' },
        { value: 30, viewValue: '30 minutes' },
        { value: 60, viewValue: '1 hour' },
        { value: 720, viewValue: '12 hours' },
        { value: 1440, viewValue: '1 day' },
        { value: 4320, viewValue: '3 days' },
        { value: 10080, viewValue: '7 days' },
    ];
    txActionTypeOptions: Array<string | TxStatus> = Object.values(TxStatus).filter(
        (value) => typeof value === 'string'
    );

    selectedMinutes: number = this.dateOptions[4].value;
    selectedStatus: string = 'All';

    timerSub: Subscription;
    autoSync: boolean = false;
    isSyncing: boolean = false;
    lastReloadTimestamp: number;
    secondsSinceLastReload: number;
    loadedTxData: ExtendedResponse[];

    constructor(
        private customApi: CustomApiService,
        private snackbar: MatSnackBar,
        private dialog: MatDialog,
        private assetTypeUtility: AssetTypeUtilityService
    ) { }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.load(true);
        this.setupAutoSync();
    }

    getToggleText(): string {
        return this.autoSync ? 'Syncing is ON' : 'Syncing is OFF';
    }

    getToggleIcon(): string {
        return this.autoSync ? 'fa-toggle-on' : 'fa-toggle-off';
    }

    setupAutoSync() {
        this.timerSub = interval(10000).subscribe(() => {
            this.reload(false);
        });
    }

    reload(showLoading: boolean) {
        if (this.isSyncing || !this.autoSync) {
            return;
        }
        this.load(showLoading);
    }

    load(showLoading: boolean) {
        this.isSyncing = true;
        this.customApi
            .getTransactionGetTransactions(this.selectedMinutes, '', showLoading)
            .subscribe(
                (response) => {
                    this.loadedTxData = response.data;
                    this.loadedTxData.forEach((x) => {
                        x.icon = this.assetTypeUtility.icon(x.assetType);
                    });
                    this.applyFilters();
                },
                () => { },
                () => setTimeout(() => (this.isSyncing = false), 1000)
            );
    }

    applyFilters() {
        let data: ExtendedResponse[] = this.loadedTxData;

        if (!(this.selectedStatus === 'All' || this.selectedStatus === undefined)) {
            data = data.filter((x) => x.status === TxStatus[this.selectedStatus]);
        }

        const selectedIds = this.selection.selected.map((x) => x.id);
        this.selection.clear();
        data.filter((x) => selectedIds.includes(x.id)).forEach((x) => this.selection.select(x));
        this.dataSource.data = data;
    }
    getAssetIcon(assetType: AssetTypes) {
        return this.assetTypeUtility.icon(assetType);
    }
    showTxInBlockchainExplorer(assetType: AssetTypes, txId: string) {
        const url = `${this.assetTypeUtility.txUrl(assetType)}/${txId}`;
        window.open(url, '_blank');
    }

    toggleSync() {
        this.autoSync = !this.autoSync;
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    showDialog() {
        this.dialog.open(this.cancelDialog);
    }

    cancelTransactions() {
        const txids = new CancelTransactionsDto({
            transactionIds: this.selection.selected.map((x) => x.id),
        });
        this.customApi.postTransactionCancelTransactions(txids).subscribe(
            (response) => {
                console.log(response);
                this.snackbar.open(`Cancelled ${response.data} transaction!`, 'OK', {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    politeness: 'polite',
                });
            },
            (error) => {
                console.error(error);
            },
            () => {
                this.load(true);
            }
        );
    }

    ngOnDestroy(): void {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
    }
}
