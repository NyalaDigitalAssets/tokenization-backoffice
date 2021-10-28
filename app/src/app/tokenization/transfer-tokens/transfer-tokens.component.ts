import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

import {
    IssuerWalletTokenizedAssetTransferDto,
    SimpleAccessCredentialsDto,
    TokenizedAssetToRetailWallet,
} from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

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

    @ViewChild('credForm') credForm;
    model: IssuerWalletTokenizedAssetTransferDto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private ngxCsvParser: NgxCsvParser,
        private customApi: CustomApiService,
        private snackbar: MatSnackBar,
        private router: Router
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
                () => {
                    this.snackbar.open('Transactions initated!', 'OK', {
                        duration: 5000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                        politeness: 'polite',
                    });
                    this.router.navigate([
                        'tokenization',
                        this.issuerWalletSeedId,
                        'issuer-wallets',
                        this.issuerWalletId,
                        'tokens',
                        this.tokenizedAssetId,
                    ]);
                },
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
                },
                (error: NgxCSVParserError) => {
                    console.error('Error', error);
                }
            );
    }

    resetFields() {
        this.model = new IssuerWalletTokenizedAssetTransferDto();
        this.selectedFile = null;
        this.selectedFileName = '';
    }
}
