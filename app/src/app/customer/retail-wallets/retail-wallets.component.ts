import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
    innerTableColums: string[] = ['token', 'balance'];
    customerId: string;
    wallets: RetailWalletDtoListApiResponse;
    expandedElement: RetailWalletDto | null;
    isLocked: boolean = false;
    disableLock: boolean = false;

    AssetTypes = AssetTypes;

    constructor(
        private customApi: CustomApiService,
        private assetTypeUtility: AssetTypeUtilityService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.customerId = this.route.snapshot.paramMap.get('customer-id');
        this.getRetailWallets();
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

    getIcon(assetType: AssetTypes): string {
        return this.assetTypeUtility.icon(assetType);
    }

    getUnit(assetType: AssetTypes): string {      
      return this.assetTypeUtility.unit(assetType);
    }
}
