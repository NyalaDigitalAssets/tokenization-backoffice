import { Injectable } from '@angular/core';

import { Blockchains } from '../models';

interface Blockchain {
    blockchain: Blockchains;
    unit: string;
    name: string;
    baseTxUrl?: string;
    baseAddressUrl?: string;
}

@Injectable({
    providedIn: 'root',
})
export class BlockchainUtilityService {
    private assets: Array<Blockchain> = [        
        {
            blockchain: Blockchains.Stellar,
            unit: 'XLM',
            name: 'Lumen',
            baseTxUrl: 'https://stellar.expert/explorer/public/tx',
            baseAddressUrl: 'https://stellar.expert/explorer/public/account',
        },
        {
            blockchain: Blockchains.Algorand,
            unit: 'ALGO',
            name: 'Algorand',
            baseTxUrl: 'https://algoexplorer.io/tx',
            baseAddressUrl: 'https://algoexplorer.io/address',
        },
        {
            blockchain: Blockchains.Polygon,
            unit: 'MATIC',
            name: 'Polygon',
            baseTxUrl: 'https://polygonscan.com',
            baseAddressUrl: 'https://polygonscan.com',
        }
        
    ];

    txUrl(blockchain: Blockchains, txId: string): string {
        const url = this.assets.find((a) => a.blockchain === blockchain).baseTxUrl;
        return `${url}/${txId}`;
    }

    addressUrl(blockchain: Blockchains, address: string): string {
        const url = this.assets.find((a) => a.blockchain === blockchain).baseAddressUrl;
        return `${url}/${address}`;
    }

    unit(blockchain: Blockchains): string {
        return this.assets.find((a) => a.blockchain === blockchain)?.unit;
    }

    name(blockchain: Blockchains): string {
        return this.assets.find((a) => a.blockchain === blockchain)?.name;
    }

    icon(blockchain: Blockchains): string {
        const unit = this.assets.find((a) => a.blockchain === blockchain)?.unit;
        if (blockchain > 1000) {
            return `currency_${unit?.toLowerCase()}`;
        }
        return `crypto-asset_${unit?.toLowerCase()}`;
    }
}
