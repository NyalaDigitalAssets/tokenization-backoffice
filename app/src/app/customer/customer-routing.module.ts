import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';

import { ListComponent } from './list/list.component';
import { RetailWalletsComponent } from './retail-wallets/retail-wallets.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':customer-id',
    component: DetailsComponent
  },
  {
    path: ':customer-id/retail-wallets',
    component: RetailWalletsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
