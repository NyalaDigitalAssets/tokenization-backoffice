import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-toml-builder',
    templateUrl: './toml-builder.component.html',
    styleUrls: ['./toml-builder.component.scss'],
})
export class TomlBuilderComponent implements OnInit {
    @ViewChild('credForm') credForm;
    @ViewChild('singleForm') singleForm;
    
    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    model: any;

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
            this.model = {};
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
                this.snackbar.open(`.toml file submitted!`, 'OK', {
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
