import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

import {
    SimpleAccessCredentialsDto,
    TokenizedAssetClawbackDto,
    TokenizedAssetClawbackTransfer,
    TokenizedAssetToRetailWallet,
} from '../../core/models';

interface RetailWallet {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-clawback-tokens',
    templateUrl: './clawback-tokens.component.html',
    styleUrls: ['./clawback-tokens.component.scss'],
})
export class ClawbackTokensComponent implements OnInit {
    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;

    selectedTab: FormControl;

    amount: number;
    selectedWallet: string;

    selectedFile: File;
    selectedFileName: string;

    dataSource: MatTableDataSource<TokenizedAssetToRetailWallet>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('credForm') credForm;

    csvColumns = ['RetailWalletId', 'Amount'];

    wallets: RetailWallet[] = [
        { value: 'c930b6eb-cac4-4f0c-addc-14932f4ecf2f', viewValue: 'Wallet 1' },
        { value: '043e1d6e-77fa-48cc-b756-38303aea0598', viewValue: 'Wallet 2' },
        { value: '3ddaa5e4-747c-4283-aa33-e965d422f45f', viewValue: 'Wallet 3' }
    ];

    model: TokenizedAssetClawbackDto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private ngxCsvParser: NgxCsvParser,
        private customApi: CustomApiService) { }

    ngOnInit(): void {
        this.selectedTab = new FormControl(0);
        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;
            this.model = new TokenizedAssetClawbackDto({
                credentials: new SimpleAccessCredentialsDto(),
            });

        });
    }
    submit() {
        // if (this.selectedTab.value === 0) { //Single clawback
        this.model.clawback = new TokenizedAssetClawbackTransfer({
            amount: this.amount,
            retailWalletId: this.selectedWallet
        });
        this.customApi.postTokenizedAssetsClawbackAsset(this.issuerWalletSeedId, this.issuerWalletId, this.tokenizedAssetId, this.model)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.resetFields();
                },
                () => {
                    this.resetFields();
                });
    }

    resetFields() {
        this.dataSource = new MatTableDataSource<TokenizedAssetToRetailWallet>();
        this.model.clawback = new TokenizedAssetClawbackTransfer();
        this.selectedFile = null;
        this.selectedFileName = '';
    }
}
