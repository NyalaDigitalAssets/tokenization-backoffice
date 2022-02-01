import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CreateTokenComponent } from './create-token/create-token.component';
import { CreateComponent } from './create/create.component';
import { DeriveWalletComponent } from './derive-wallet/derive-wallet.component';
import { IssuerWalletComponent } from './issuer-wallet/issuer-wallet.component';
import { ListComponent } from './list/list.component';
import { TokenDetailsComponent } from './token-details/token-details.component';
import { TokenizationRoutingModule } from './tokenization-routing.module';
import { LockIssuerWalletComponent } from './lock-issuer-wallet/lock-issuer-wallet.component';
import { TransferTokensComponent } from './transfer-tokens/transfer-tokens.component';
import { ClawbackTokensComponent } from './clawback-tokens/clawback-tokens.component';
import { BurnTokensComponent } from './burn-tokens/burn-tokens.component';
import { TomlBuilderComponent } from './toml-builder/toml-builder.component';

@NgModule({
    declarations: [
        ListComponent,
        CreateComponent,
        DeriveWalletComponent,
        CreateTokenComponent,
        IssuerWalletComponent,
        TokenDetailsComponent,
        LockIssuerWalletComponent,
        TransferTokensComponent,
        ClawbackTokensComponent,
        BurnTokensComponent,
        TomlBuilderComponent,
    ],
    imports: [CoreModule, SharedModule, CommonModule, FormsModule, TokenizationRoutingModule],
})
export class TokenizationModule {}
