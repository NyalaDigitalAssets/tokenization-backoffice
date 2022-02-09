import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SimpleAccessCredentialsDto, TokenizedAssetBurnDto } from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-burn-tokens',
    templateUrl: './burn-tokens.component.html',
    styleUrls: ['./burn-tokens.component.scss'],
})
export class BurnTokensComponent implements OnInit {
    @ViewChild('credForm') credForm;
    @ViewChild('singleForm') singleForm;

    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    model: TokenizedAssetBurnDto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private customApi: CustomApiService
    ) {}

    ngOnInit(): void {
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
        this.customApi
            .postTokenizedAssetsBurnAsset(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId,
                this.model
            )
            .subscribe(() => {
                this.snackbar.open(`${this.model.amount} tokens burned successfully!`, 'OK', {
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
            });
    }
}
