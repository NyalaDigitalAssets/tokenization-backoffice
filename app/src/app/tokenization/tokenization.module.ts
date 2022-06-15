import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { TokenizationRoutingModule } from './tokenization-routing.module';


@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [CoreModule, SharedModule, CommonModule, FormsModule, TokenizationRoutingModule],
})
export class TokenizationModule {}
