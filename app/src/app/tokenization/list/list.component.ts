import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetTypeUtilityService } from 'src/app/core/services/asset-types-utility.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { AssetTypes, IIssuerWalletDto, IssuerWalletSeedDto } from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @ViewChild('qrTpl') qrTpl: TemplateRef<any>;

    publicAddress: string;
    issuerWalletSeeds: IssuerWalletSeedDto[];
    AssetTypes = AssetTypes;

    constructor(
        private customApi: CustomApiService,
        private router: Router,
        private assetTypeUtility: AssetTypeUtilityService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
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

    sendTokens(wallet: IIssuerWalletDto) {}

    loadIssuerWalletSeeds() {
        this.customApi.getIssuerWalletGetIssuerWalletSeeds().subscribe((response) => {
            this.issuerWalletSeeds = (response.data || []).sort((a, b) =>
                a.createdDt < b.createdDt ? 1 : -1
            );
        });
    }
}
