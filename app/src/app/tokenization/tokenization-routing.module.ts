import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BurnTokensComponent } from './burn-tokens/burn-tokens.component';
import { ClawbackTokensComponent } from './clawback-tokens/clawback-tokens.component';

import { CreateTokenComponent } from './create-token/create-token.component';
import { CreateComponent } from './create/create.component';
import { DeriveWalletComponent } from './derive-wallet/derive-wallet.component';
import { ListComponent } from './list/list.component';
import { LockIssuerWalletComponent } from './lock-issuer-wallet/lock-issuer-wallet.component';
import { TokenDetailsComponent } from './token-details/token-details.component';
import { TomlBuilderComponent } from './toml-builder/toml-builder.component';
import { TransferTokensComponent } from './transfer-tokens/transfer-tokens.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
    },
    {
        path: ':seedId/derive-wallet',
        component: DeriveWalletComponent,
    },
    {
        path: ':seedId/issuer-wallets/:issuerWalletId/lock',
        component: LockIssuerWalletComponent,
    },
    {
        path: ':seedId/create-token',
        component: CreateTokenComponent,
    },
    {
        path: ':seedId/issuer-wallets/:issuerWalletId/tokens/:tokenizedAssetId',
        component: TokenDetailsComponent,
    },
    {
        path: ':seedId/issuer-wallets/:issuerWalletId/tokens/:tokenizedAssetId/transfer',
        component: TransferTokensComponent,
    },
    {
        path: ':seedId/issuer-wallets/:issuerWalletId/tokens/:tokenizedAssetId/clawback',
        component: ClawbackTokensComponent,
    },
    {
        path: ':seedId/issuer-wallets/:issuerWalletId/tokens/:tokenizedAssetId/burn',
        component: BurnTokensComponent,
    },
    {
        path: ':seedId/issuer-wallets/:issuerWalletId/tokens/:tokenizedAssetId/toml',
        component: TomlBuilderComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TokenizationRoutingModule {}
