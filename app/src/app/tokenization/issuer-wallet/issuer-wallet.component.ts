import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
    FaucetFundingResult,
    IssuerWalletDto,
    IssuerWalletRoles,
    RequestFaucetFundingDto,
    ReviewDecision,
    TokenizedAssetDto,
} from '../../core/models';
import { BlockchainUtilityService } from '../../core/services/blockchain-utility.service';
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
    @Output() finalizeTokenCreationClicked = new EventEmitter<string>();

    tokenizedAssetColumns: string[] = ['name', 'unitName', 'review', 'action'];
    balanceColumns: string[] = ['amount', 'unitName'];

    IssuerWalletRoles = IssuerWalletRoles;
    ReviewDecision = ReviewDecision;

    constructor(
        private blockchainUtility: BlockchainUtilityService,
        private customApi: CustomApiService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    getIcon(): string {
        return this.blockchainUtility.icon(this.wallet.blockchain);
    }

    goToBlockchainExplorer() {
        const url = this.blockchainUtility.addressUrl(
            this.wallet.blockchain,
            this.wallet.publicAddress
        );
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

    finalizeTokenCreation(token: TokenizedAssetDto) {
        this.finalizeTokenCreationClicked.emit(token.id);
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
            amount:
                this.wallet.balance.nativeBalance.free + this.wallet.balance.nativeBalance.locked,
            unitName: this.blockchainUtility.unit(this.wallet.blockchain),
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
