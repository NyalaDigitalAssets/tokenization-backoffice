import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportComponent } from './import/import.component';
import { ListComponent } from './list/list.component';
import { TransferFungibleTokensComponent } from './transfer-fungible-tokens/transfer-fungible-tokens.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'import',
        component: ImportComponent,
    },
    {
        path: 'transfer-fungible',
        component: TransferFungibleTokensComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExternalRetailWalletRoutingModule {}
