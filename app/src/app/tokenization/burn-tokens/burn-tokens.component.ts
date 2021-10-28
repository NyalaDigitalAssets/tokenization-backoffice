import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

import {
    SimpleAccessCredentialsDto,
    TokenizedAssetBurnDto,
} from '../../core/models';

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
        this.model.amount = this.amount;
        this.customApi.postTokenizedAssetsBurnAsset(this.issuerWalletSeedId, this.issuerWalletId, this.tokenizedAssetId, this.model)
            .subscribe(
                (response) => {
                    this.resetFields();
                },
                () => {
                    this.resetFields();
                });
    }

    resetFields() {
        this.model = new TokenizedAssetBurnDto();
    }
}
