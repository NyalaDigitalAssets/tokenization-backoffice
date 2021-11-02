import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TxRoutingModule } from './tx-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TxRoutingModule
  ]
})
export class TxModule { }
