import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListComponent } from './list/list.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RetailWalletsComponent } from './retail-wallets/retail-wallets.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    RetailWalletsComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    CustomerRoutingModule
  ]
})  
export class CustomerModule { }
