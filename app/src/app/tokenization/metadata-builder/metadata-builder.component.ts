import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMetadataFileDto, MetadataPrincipal, SimpleAccessCredentialsDto } from '../../core/models';

import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-metadata-builder',
    templateUrl: './metadata-builder.component.html',
    styleUrls: ['./metadata-builder.component.scss'],
})
export class MetadataBuilderComponent implements OnInit {
    @ViewChild('credForm') credForm;
    @ViewChild('singleForm') singleForm;

    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    model: CreateMetadataFileDto;
    newPrincipal = new MetadataPrincipal();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private customApi: CustomApiService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;
            this.model = new CreateMetadataFileDto({
                credentials: new SimpleAccessCredentialsDto(),
            });
        });
    }

    addPrincipal() {
        this.model.principals.push(this.newPrincipal);
        this.newPrincipal = new MetadataPrincipal();
    }

    submit() {
        this.customApi
            .postTokenizedAssetsBuildAndSubmitMetadaFile(
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
