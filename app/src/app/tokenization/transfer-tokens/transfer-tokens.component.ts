import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

import {
    IssuerWalletTokenizedAssetTransferDto,
    SimpleAccessCredentialsDto,
    TokenizedAssetToRetailWallet,
} from '../../core/models';

interface RetailWallet {
    value: string;
    viewValue: string;
}

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
    selectedTab: FormControl;
    selectedWallet: string;
    selectedFile: File;
    selectedFileName: string;

    wallets: RetailWallet[] = [
        { value: '1ddaa5e4-747c-4283-aa33-e965d422f45f', viewValue: 'Wallet 1' },
        { value: '2ddaa5e4-747c-4283-aa33-e965d422f45f', viewValue: 'Wallet 2' },
        { value: '3ddaa5e4-747c-4283-aa33-e965d422f45f', viewValue: 'Wallet 3' }
    ];

    model: IssuerWalletTokenizedAssetTransferDto;

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
            this.model = new IssuerWalletTokenizedAssetTransferDto({
                credentials: new SimpleAccessCredentialsDto(),
            });
        });
    }

    submit() {
        if (this.selectedTab.value === 0) { //Single transfer
            this.model.transfers = new Array<TokenizedAssetToRetailWallet>();
            this.model.transfers.push(new TokenizedAssetToRetailWallet({
                amount: this.amount,
                retailWalletId: this.selectedWallet
            }));
            this.customApi.postTokenizedAssetsTransferTokenizedAssets(this.issuerWalletSeedId, this.issuerWalletId, this.tokenizedAssetId, this.model)
                .subscribe((response) => {
                });
        } else {  //Multiple transfer
            this.ngxCsvParser.parse(this.selectedFile, { header: false, delimiter: ',' })
                .pipe().subscribe((result: Array<any>) => {
                    this.model.transfers = new Array<TokenizedAssetToRetailWallet>();
                    for (let i = 0; i < result.length; i++)
                        this.model.transfers.push(new TokenizedAssetToRetailWallet({
                            amount: result[i][1],
                            retailWalletId: result[i][0]
                        }));
                    this.customApi.postTokenizedAssetsTransferTokenizedAssets(this.issuerWalletSeedId, this.issuerWalletId, this.tokenizedAssetId, this.model)
                        .subscribe((response) => {
                        });
                }, (error: NgxCSVParserError) => {
                    console.log('Error', error);
                });
        }
    }
    csvInputChange(fileInputEvent: any) {
        this.selectedFile = fileInputEvent.target.files[0];
        this.selectedFileName = this.selectedFile.name;
    }
}
