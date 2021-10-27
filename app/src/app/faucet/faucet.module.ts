import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaucetRoutingModule } from './faucet-routing.module';
import { FundingComponent } from './funding/funding.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [FundingComponent],
    imports: [CoreModule, SharedModule, CommonModule, FormsModule, FaucetRoutingModule],
})
export class FaucetModule {}
