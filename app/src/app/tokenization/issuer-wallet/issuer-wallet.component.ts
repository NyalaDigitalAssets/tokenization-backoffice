import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IssuerWalletDto, IssuerWalletRoles, TokenizedAssetDto } from '../../core/models';
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

    tokenizedAssetColumns: string[] = ['name', 'unitName', 'totalSupply', 'decimals', 'action'];
    balanceColumns: string[] = ['amount', 'unitName'];
    IssuerWalletRoles = IssuerWalletRoles;

    constructor(private assetTypeUtility: AssetTypeUtilityService, private router: Router) {}

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

    showToken(token: TokenizedAssetDto) {
        this.router.navigate([
            'tokenization',
            this.wallet.issuerWalletSeedId,
            'issuer-wallets',
            this.wallet.id,
            'tokens',
            token.id,
        ]);
    }

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
