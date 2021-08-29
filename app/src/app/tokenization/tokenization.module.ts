import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenizationRoutingModule } from './tokenization-routing.module';
import { ListComponent } from './list/list.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { DeriveWalletComponent } from './derive-wallet/derive-wallet.component';
import { CreateTokenComponent } from './create-token/create-token.component';

@NgModule({
  declarations: [ListComponent, CreateComponent, DeriveWalletComponent, CreateTokenComponent],
  imports: [CoreModule, SharedModule, CommonModule, FormsModule, TokenizationRoutingModule],
})
export class TokenizationModule {}
