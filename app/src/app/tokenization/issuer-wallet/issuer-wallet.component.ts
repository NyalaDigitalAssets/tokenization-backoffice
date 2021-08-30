import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IssuerWalletDto, IssuerWalletRoles } from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';

interface Balance {
    amount: number;
    unitName: string;
}

@Component({
    selector: 'app-issuer-wallet',
    templateUrl: './issuer-wallet.component.html',
    styleUrls: ['./issuer-wallet.component.scss'],
})
export class IssuerWalletComponent implements OnInit {
    @Input() wallet: IssuerWalletDto;
    @Output() showQrCodeClicked = new EventEmitter<string>();

    tokenizedAssetColumns: string[] = ['name', 'unitName', 'totalSupply', 'decimals'];
    balanceColumns: string[] = ['amount', 'unitName'];
    IssuerWalletRoles = IssuerWalletRoles;

    constructor(private assetTypeUtility: AssetTypeUtilityService) {}

    ngOnInit(): void {}

    getIcon(): string {
        return this.assetTypeUtility.icon(this.wallet.assetType);
    }

    goToBlockchainExplorer() {
        const url = `${this.assetTypeUtility.addressUrl(this.wallet.assetType)}/${
            this.wallet.publicAddress
        }`;
        window.open(url, '_blank');
    }

    showAddressQrCode() {
        this.showQrCodeClicked.emit(this.wallet.publicAddress);
    }

    sendTokens() {}

    getBalances(): Balance[] {
        const balances: Balance[] = [];

        balances.push({
            amount: this.wallet.balance.nativeBalance,
            unitName: this.assetTypeUtility.unit(this.wallet.assetType),
        });

        if (this.wallet.balance.nonNativeBalances) {
            for (const unitName in this.wallet.balance.nonNativeBalances) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        this.wallet.balance.nonNativeBalances,
                        unitName
                    )
                ) {
                    const amount = this.wallet.balance.nonNativeBalances[unitName];
                    balances.push({
                        amount: amount,
                        unitName: unitName,
                    });
                }
            }
        }

        return balances;
    }
}
