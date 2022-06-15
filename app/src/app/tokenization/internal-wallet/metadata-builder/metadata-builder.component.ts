import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateMetadataFileDto, MetadataPrincipal, SimpleAccessCredentialsDto } from '../../../core/models';
import { ApiService } from '../../../core/services/api.service';

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
    orgLogoImg: any;
    tokenLogoImg: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private api: ApiService
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

    logoSelected(file: any) {
        this.orgLogoImg = file;
    }

    logoRemoved() {
        this.orgLogoImg = undefined;
    }

    tokenImageSelected(file: any) {
        this.tokenLogoImg = file;
    }

    tokenImageRemoved() {
        this.tokenLogoImg = undefined;
    }


    submit() {

        const formData = new FormData();

        if (!this.orgLogoImg) {
            this.snackbar.open('Organization Logo is required!', 'Ok', { duration: 3000 });
        }

        formData.set('orgImageFile', this.orgLogoImg, 'org.png');
        formData.set('metaDataFormData', JSON.stringify(this.model));

        if (this.tokenLogoImg) {
            formData.set('tokenImageFile', this.tokenLogoImg, 'token.png');
        }

        this.api.post(`/api/external/v1/issuer-wallet-seeds/${this.issuerWalletSeedId}/issuer-wallets/${this.issuerWalletId}/tokenized-assets/${this.tokenizedAssetId}/metadata`, formData)
            .subscribe(() => {
                this.snackbar.open(`Metadata file submitted!`, 'OK', {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    politeness: 'polite',
                });
                this.router.navigate([
                    'tokenization',
                    'internal',
                    this.issuerWalletSeedId,
                    'issuer-wallets',
                    this.issuerWalletId,
                    'tokens',
                    this.tokenizedAssetId,
                ]);
            });
    }
}
