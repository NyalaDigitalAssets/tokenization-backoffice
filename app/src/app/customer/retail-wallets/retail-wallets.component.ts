import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Blockchains, LockWalletsDto, RetailWalletDto, RetailWalletDtoListApiResponse } from '../../core/models';
import { BlockchainUtilityService } from '../../core/services/blockchain-utility.service';
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
    displayedColumns: string[] = ['blockchain', 'publicAddress', 'nativeBalance', 'lockstatus'];
    innerTableColums: string[] = ['token', 'balance'];
    customerId: string;
    wallets: RetailWalletDtoListApiResponse;
    expandedElement: RetailWalletDto | null;
    isLocked = false;
    disableLock = false;

    constructor(
        private customApi: CustomApiService,
        private blockchainUtility: BlockchainUtilityService,
        private route: ActivatedRoute,
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
        const dto = new LockWalletsDto();
        dto.lock = lock;
        this.customApi.putRetailWalletLockRetailWallets(this.customerId, dto).subscribe((data) => {
            if (data?.data) {
                this.getRetailWallets();
            }
        });
    }

    getIcon(blockchain: Blockchains): string {
        return this.blockchainUtility.icon(blockchain);
    }

    getUnit(blockchain: Blockchains): string {
        return this.blockchainUtility.unit(blockchain);
    }
}
