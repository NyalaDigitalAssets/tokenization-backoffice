import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { ExternalRetailWalletRoutingModule } from './external-wallets-routing.module';
import { ImportComponent } from './import/import.component';
import { ListComponent } from './list/list.component';
import { TransferFungibleTokensComponent} from './transfer-fungible-tokens/transfer-fungible-tokens.component';

@NgModule({
    declarations: [
        ListComponent,
        ImportComponent,
        TransferFungibleTokensComponent
    ],
    imports: [CoreModule, SharedModule, CommonModule, FormsModule, ExternalRetailWalletRoutingModule],
})
export class ExternalWalletModule {}
