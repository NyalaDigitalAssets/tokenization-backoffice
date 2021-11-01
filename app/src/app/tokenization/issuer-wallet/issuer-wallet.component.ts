import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
    FaucetFundingResult,
    IssuerWalletDto,
    IssuerWalletRoles,
    RequestFaucetFundingDto,
    TokenizedAssetDto,
} from '../../core/models';
import { AssetTypeUtilityService } from '../../core/services/asset-types-utility.service';
import { CustomApiService } from '../../core/services/ganymede.service';

interface Balance {
    amount: number;
    unitName: string;
}

@Component({
    selector: 'app-issuer-wallet',
    templateUrl: './issuer-wallet.component.html',
    styleUrls: ['./issuer-wallet.component.scss'],
})
export class IssuerWalletComponent {
    @Input() wallet: IssuerWalletDto;
    @Output() showQrCodeClicked = new EventEmitter<string>();

    tokenizedAssetColumns: string[] = ['name', 'unitName', 'totalSupply', 'decimals', 'action'];
    balanceColumns: string[] = ['amount', 'unitName'];
    IssuerWalletRoles = IssuerWalletRoles;

    constructor(
        private assetTypeUtility: AssetTypeUtilityService,
        private customApi: CustomApiService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    getIcon(): string {
        return this.assetTypeUtility.icon(this.wallet.assetType);
    }

    goToBlockchainExplorer() {
        const url = `${this.assetTypeUtility.addressUrl(this.wallet.assetType)}/${
            this.wallet.publicAddress
        }`;
        window.open(url, '_blank');
    }

    goToAccountLocking() {
        this.router.navigate([
            'tokenization',
            this.wallet.issuerWalletSeedId,
            'issuer-wallets',
            this.wallet.id,
            'lock',
        ]);
    }

    requestFunding() {
        const model = new RequestFaucetFundingDto({ issuerWallets: [this.wallet.id] });
        this.customApi.postFaucetRequestWalletFunding(model).subscribe((results) => {
            const fundingRequest = results.data.issuerFundingResults[0];
            this.snackBar.open(
                fundingRequest.result === FaucetFundingResult.Initiated
                    ? 'Funding requested!'
                    : 'Unable to request funding at the moment!',
                'OK',
                {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    politeness: 'polite',
                }
            );
        });
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
