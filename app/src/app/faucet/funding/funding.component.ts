import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';

import {
    FaucetFundingResult,
    RequestFaucetFundingDto,
    WalletFundingResult,
} from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-funding',
    templateUrl: './funding.component.html',
    styleUrls: ['./funding.component.scss'],
})
export class FundingComponent implements OnInit {
    model = new RequestFaucetFundingDto();
    results: WalletFundingResult[];
    submitted = false;

    resultColumns = ['WalletId', 'Result'];
    FaucetFundingResult = FaucetFundingResult;
    headerContent: string;

    constructor(private ngxCsvParser: NgxCsvParser, private customApi: CustomApiService) {}

    ngOnInit(): void {
        this.headerContent = `This faucet can be used to top up your issuer or retail wallets with native tokens in order to create new tokenized assets or to establish more than one opt-in from a given retail wallet.`;
    }

    loadRetailWallets(file: any) {
        this.ngxCsvParser
            .parse(file, { header: false, delimiter: ',' })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    this.model.retailWallets = new Array<string>();
                    for (let i = 0; i < result.length; i++) {
                        this.model.retailWallets.push(result[i][0]);
                    }
                },
                (error) => {
                    console.error('Error', error);
                }
            );
    }

    loadIssuerWallets(file: any) {
        this.ngxCsvParser
            .parse(file, { header: false, delimiter: ',' })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    this.model.issuerWallets = new Array<string>();
                    for (let i = 0; i < result.length; i++) {
                        this.model.issuerWallets.push(result[i][0]);
                    }
                },
                (error) => {
                    console.error('Error', error);
                }
            );
    }

    reset() {
        this.model = new RequestFaucetFundingDto();
    }

    submit() {
        this.customApi.postFaucetRequestWalletFunding(this.model).subscribe(
            (results) => {
                this.submitted = true;
                this.results = [
                    ...results.data.issuerFundingResults,
                    ...results.data.retailFundingResults,
                ];
            },
            () => {},
            () => this.reset()
        );
    }
}
