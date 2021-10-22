import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

import {
    IssuerWalletTokenizedAssetTransferDto,
    SimpleAccessCredentialsDto,
    TokenizedAssetToRetailWallet,
} from '../../core/models';

@Component({
    selector: 'app-transfer-tokens',
    templateUrl: './transfer-tokens.component.html',
    styleUrls: ['./transfer-tokens.component.scss'],
})
export class TransferTokensComponent implements OnInit {
    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;

    amount: number;
    selectedWallet: string;

    selectedFile: File;
    selectedFileName: string;

    dataSource: MatTableDataSource<TokenizedAssetToRetailWallet>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('credForm') credForm;

    csvColumns = ['RetailWalletId', 'Amount'];
    model: IssuerWalletTokenizedAssetTransferDto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private ngxCsvParser: NgxCsvParser,
        private customApi: CustomApiService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;
            this.model = new IssuerWalletTokenizedAssetTransferDto({
                credentials: new SimpleAccessCredentialsDto(),
            });
        });
    }

    submit() {
        this.customApi
            .postTokenizedAssetsTransferTokenizedAssets(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId,
                this.model
            )
            .subscribe(
                () => {},
                () => {},
                () => {
                    this.resetFields();
                }
            );
    }

    csvInputChange(fileInputEvent: any) {
        this.selectedFile = fileInputEvent;
        this.selectedFileName = this.selectedFile.name;
        this.ngxCsvParser
            .parse(this.selectedFile, { header: false, delimiter: ',' })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    this.model.transfers = new Array<TokenizedAssetToRetailWallet>();
                    for (let i = 0; i < result.length; i++)
                        this.model.transfers.push(
                            new TokenizedAssetToRetailWallet({
                                retailWalletId: result[i][0],
                                amount: parseFloat(result[i][1]),
                            })
                        );
                    this.dataSource = new MatTableDataSource<TokenizedAssetToRetailWallet>(
                        this.model.transfers
                    );
                    this.dataSource.paginator = this.paginator;
                },
                (error: NgxCSVParserError) => {
                    console.error('Error', error);
                }
            );
    }

    resetFields() {
        this.dataSource = new MatTableDataSource<TokenizedAssetToRetailWallet>();
        this.model.transfers = new Array<TokenizedAssetToRetailWallet>();
        this.selectedFile = null;
        this.selectedFileName = '';
    }
}
