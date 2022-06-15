import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

import {
    SimpleAccessCredentialsDto,
    TokenizedAssetClawbackDto,
    TokenizedAssetClawbackTransfer,
} from '../../../core/models';
import { CustomApiService } from '../../../core/services/ganymede.service';

@Component({
    selector: 'app-clawback-tokens',
    templateUrl: './clawback-tokens.component.html',
    styleUrls: ['./clawback-tokens.component.scss'],
})
export class ClawbackTokensComponent implements OnInit {
    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;

    selectedWallet: string;
    selectedFile: File;
    selectedFileName: string;

    @ViewChild('credForm') credForm;
    model: TokenizedAssetClawbackDto;

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
            this.model = new TokenizedAssetClawbackDto({
                credentials: new SimpleAccessCredentialsDto(),
            });
        });
    }

    submit() {
        this.customApi
            .postTokenizedAssetsClawbackAsset(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId,
                this.model
            )
            .subscribe(
                () => {
                    this.snackbar.open('Clawbacks initated!', 'OK', {
                        duration: 5000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                        politeness: 'polite',
                    });
                    this.router.navigate(['tx']);
                },
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
                    this.model.clawbacks = new Array<TokenizedAssetClawbackTransfer>();
                    for (let i = 0; i < result.length; i++)
                        this.model.clawbacks.push(
                            new TokenizedAssetClawbackTransfer({
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
        this.model.clawbacks = [];
        this.selectedFile = null;
        this.selectedFileName = '';
    }
}
