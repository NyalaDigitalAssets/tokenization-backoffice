import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import {
    AssetTypes,
    LockRetailWalletsDto,
    RetailWalletDto,
    RetailWalletDtoListApiResponse,
} from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
    selector: 'app-retail-wallets',
    templateUrl: './retail-wallets.component.html',
    styleUrls: ['./retail-wallets.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class RetailWalletsComponent implements OnInit {
    displayedColumns: string[] = ['assetType', 'publicAddress', 'nativeBalance', 'lockstatus'];
    innerTableColums: string[] = ['token', 'balance', 'actions'];
    customerId: string;
    wallets: RetailWalletDtoListApiResponse;
    expandedElement: RetailWalletDto | null;
    isLocked = false;
    disableLock = false;

    AssetTypes = AssetTypes;

    @ViewChild('cbDialog', { static: true }) cbDialog: TemplateRef<any>;

    constructor(
        private customApi: CustomApiService,
        private assetTypeUtility: AssetTypeUtilityService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.customerId = params.customerId;
            this.getRetailWallets();
        });
    }

    getRetailWallets() {
        this.customApi.getRetailWalletGetRetailWalletsDetails(this.customerId).subscribe(
            (data) => {
                this.wallets = data;
                if (this.wallets?.data?.length > 0) {
                    this.isLocked = this.wallets.data[0].seedLockStatus;
                }
            },
            () => {},
            () => {
                this.disableLock = false;
            }
        );
    }

    lockWallet(lock: boolean) {
        this.disableLock = true;
        const dto = new LockRetailWalletsDto();
        dto.lock = lock;
        this.customApi.putRetailWalletLockRetailWallets(this.customerId, dto).subscribe((data) => {
            if (data?.data) {
                this.getRetailWallets();
            }
        });
    }

    showClawbackDialog(seedId: string, walletId: string){
        this.dialog.open(this.cbDialog);
    }    

    getIcon(assetType: AssetTypes): string {
        return this.assetTypeUtility.icon(assetType);
    }

    getUnit(assetType: AssetTypes): string {
        return this.assetTypeUtility.unit(assetType);
    }
}
