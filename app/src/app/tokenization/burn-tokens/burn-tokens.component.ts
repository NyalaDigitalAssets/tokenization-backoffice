import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

import {
    SimpleAccessCredentialsDto,
    TokenizedAssetBurnDto,
    TokenizedAssetBurn,
    TokenizedAssetToRetailWallet,
} from '../../core/models';

interface RetailWallet {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-burn-tokens',
    templateUrl: './burn-tokens.component.html',
    styleUrls: ['./burn-tokens.component.scss'],
})
export class BurnTokensComponent implements OnInit {
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

    model: TokenizedAssetBurnDto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private customApi: CustomApiService) { }

    ngOnInit(): void {
        this.selectedTab = new FormControl(0);
        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;
            this.model = new TokenizedAssetBurnDto({
                credentials: new SimpleAccessCredentialsDto(),
            });

        });
    }
    submit() {
        this.model.burn = new TokenizedAssetBurn({
            amount: this.amount,
            retailWalletId: this.selectedWallet
        });
        this.customApi.postTokenizedAssetsBurnAsset(this.issuerWalletSeedId, this.issuerWalletId, this.tokenizedAssetId, this.model)
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
        this.model.burn = new TokenizedAssetBurn();
        this.selectedFile = null;
        this.selectedFileName = '';
    }
}
