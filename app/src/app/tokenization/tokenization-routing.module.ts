import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTokenComponent } from './create-token/create-token.component';
import { CreateComponent } from './create/create.component';
import { DeriveWalletComponent } from './derive-wallet/derive-wallet.component';
import { ListComponent } from './list/list.component';

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
    path: ':seedId/create-token',
    component: CreateTokenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenizationRoutingModule {}
