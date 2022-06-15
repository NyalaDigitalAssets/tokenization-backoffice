import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

import {
    IssuerWalletFungibleAssetTransferDto,
    SimpleAccessCredentialsDto,
    TokenizedAssetToExternalRetailWallet,
} from '../../../core/models';
import { CustomApiService } from '../../../core/services/ganymede.service';

@Component({
    selector: 'app-transfer-tokens',
    templateUrl: './transfer-tokens.component.html',
    styleUrls: ['./transfer-tokens.component.scss'],
})
export class TransferFungibleTokensComponent implements OnInit {
    issuerWalletId: string;
    tokenizedAssetId: string;

    amount: number;
    selectedWallet: string;

    selectedFile: File;
    selectedFileName: string;

    @ViewChild('credForm') credForm;
    model: IssuerWalletFungibleAssetTransferDto;

    constructor(
        private ngxCsvParser: NgxCsvParser,
        private customApi: CustomApiService,
        private snackbar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.model = new IssuerWalletFungibleAssetTransferDto({
            credentials: new SimpleAccessCredentialsDto(),
        });
    }

    submit() {
        this.customApi
            .postTokenizedAssetsTransferFungibleAssets(
                this.issuerWalletId,
                this.tokenizedAssetId,
                this.model
            )
            .subscribe(
                () => {
                    this.snackbar.open('Transactions initated!', 'OK', {
                        duration: 5000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                        politeness: 'polite',
                    });
                    this.router.navigate(['tx']);
                },
                () => { },
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
                    this.model.transfers = new Array<TokenizedAssetToExternalRetailWallet>();
                    for (let i = 0; i < result.length; i++)
                        this.model.transfers.push(
                            new TokenizedAssetToExternalRetailWallet({
                                externalRetailWalletId: result[i][0],
                                amount: parseFloat(result[i][1]),
                            })
                        );
                    console.log("model:", this.model);
                },
                (error: NgxCSVParserError) => {
                    console.error('Error', error);
                }
            );
    }

    resetFields() {
        this.model = new IssuerWalletFungibleAssetTransferDto();
        this.selectedFile = null;
        this.selectedFileName = '';
    }
}
