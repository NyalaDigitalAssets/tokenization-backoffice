import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
    },
    {
        path: 'tokenization',
        loadChildren: () =>
            import('./tokenization/tokenization.module').then((m) => m.TokenizationModule),
    },
    {
        path: 'faucet',
        loadChildren: () => import('./faucet/faucet.module').then((m) => m.FaucetModule),
    },
    {
        path: 'tx',
        loadChildren: () => import('./tx/tx.module').then((m) => m.TxModule),
    },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
