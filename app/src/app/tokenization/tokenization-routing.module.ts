import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'external',
        loadChildren: () =>
            import('./external-wallet/external-walelts.module').then((m) => m.ExternalWalletModule),
    },
    {
        path: 'internal',
        loadChildren: () =>
            import('./internal-wallet/internal-walelts.module').then((m) => m.InternalWalletModule),
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TokenizationRoutingModule {}
