import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TxRoutingModule } from './tx-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    CommonModule,
    TxRoutingModule,
  ]
  
})
export class TxModule { }
