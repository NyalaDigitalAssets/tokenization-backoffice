import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundingComponent } from './funding/funding.component';

const routes: Routes = [{
  path: '',
  component: FundingComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaucetRoutingModule { }
