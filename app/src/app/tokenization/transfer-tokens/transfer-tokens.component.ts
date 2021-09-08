import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
    IssuerWalletTokenizedAssetTransferDto,
    SimpleAccessCredentialsDto,
} from '../../core/models';

@Component({
    selector: 'app-transfer-tokens',
    templateUrl: './transfer-tokens.component.html',
    styleUrls: ['./transfer-tokens.component.scss'],
})
export class TransferTokensComponent implements OnInit {
    issuerWalletSeedId: string;
    issuerWalletId: string;
    tokenizedAssetId: string;

    model: IssuerWalletTokenizedAssetTransferDto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.issuerWalletSeedId = params.seedId;
            this.issuerWalletId = params.issuerWalletId;
            this.tokenizedAssetId = params.tokenizedAssetId;
            this.model = new IssuerWalletTokenizedAssetTransferDto({
                credentials: new SimpleAccessCredentialsDto(),
            });
        });
    }

    submit() {}
}
