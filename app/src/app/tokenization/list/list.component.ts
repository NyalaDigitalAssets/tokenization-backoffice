import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { AssetTypes, IssuerWalletSeedDto, SimpleAccessCredentialsDto } from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @ViewChild('qrTpl') qrTpl: TemplateRef<any>;
    @ViewChild('pwdDialog', { static: true }) pwdDialog: TemplateRef<any>;

    publicAddress: string;
    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;
    issuerWalletSeeds: IssuerWalletSeedDto[];
    AssetTypes = AssetTypes;
    credentials: SimpleAccessCredentialsDto;

    constructor(
        private customApi: CustomApiService,
        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.credentials = new SimpleAccessCredentialsDto();
        this.loadIssuerWalletSeeds();
    }

    deriveNewWallet(id: string) {
        this.router.navigate(['tokenization', id, 'derive-wallet']);
    }

    createNewSeed() {
        this.router.navigate(['tokenization', 'create']);
    }

    createNewToken(id: string) {
        this.router.navigate(['tokenization', id, 'create-token']);
    }

    getSeedName(issuerWalletSeed: IssuerWalletSeedDto): string {
        return issuerWalletSeed.wallets[0].name.split('-')[0];
    }

    showAddressQrCode(publicAddress: string) {
        this.publicAddress = publicAddress;
        this.dialog.open(ModalComponent, {
            data: {
                component: this.qrTpl,
                showClose: true,
            },
            disableClose: false,
        });
    }

    showTokenFinalizingForm(
        issuerWalletSeedId: string,
        issuerWalletId: string,
        tokenizedAssetId: string
    ) {
        this.issuerWalletSeedId = issuerWalletSeedId;
        this.issuerWalletId = issuerWalletId;
        this.tokenizedAssetId = tokenizedAssetId;
        this.dialog.open(ModalComponent, {
            data: {
                component: this.pwdDialog,
            },
            disableClose: false,
        });
    }

    submitFinalizingTokenizedAssetCreation() {
        this.customApi
            .putTokenizedAssetsCreateTokenizedAsset(
                this.issuerWalletSeedId,
                this.issuerWalletId,
                this.tokenizedAssetId,
                this.credentials
            )
            .subscribe({
                next: (tokenizedAsset) => this.loadIssuerWalletSeeds(),
            });
    }

    loadIssuerWalletSeeds() {
        this.customApi.getIssuerWalletGetIssuerWalletSeeds().subscribe((response) => {
            this.issuerWalletSeeds = (response.data || []).sort((a, b) =>
                a.createdDt < b.createdDt ? 1 : -1
            );
        });
    }
}
