import { Injectable } from '@angular/core';
import { AssetTypes } from '../models';

interface Blockchain {
    type: AssetTypes;
    unit: string;
    feeUnit: string;
    name: string;
    color?: string;
    baseTxUrl?: string;
    baseAddressUrl?: string;
}

@Injectable({
    providedIn: 'root',
})
export class AssetTypeUtilityService {
    private assets: Array<Blockchain> = [
        {
            type: AssetTypes.BTC,
            unit: 'BTC',
            feeUnit: 'BTC',
            name: 'Bitcoin',
            color: 'rgba(247,147,26,1)',
            baseTxUrl: 'https://www.blockchain.com/btc/tx',
            baseAddressUrl: 'https://www.blockchain.com/btc/address',
        },
        {
            type: AssetTypes.ETH,
            unit: 'ETH',
            feeUnit: 'ETH',
            name: 'Ethereum',
            color: 'rgba(60,60,61,1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.XLM,
            unit: 'XLM',
            feeUnit: 'XLM',
            name: 'Lumen',
            color: 'rgba(62,27,219, 1)',
            baseTxUrl: 'https://stellarchain.io/tx',
            baseAddressUrl: 'https://stellarchain.io/address',
        },
        {
            type: AssetTypes.XTZ,
            unit: 'XTZ',
            name: 'Tezos',
            feeUnit: 'XTZ',
            color: 'rgba(44, 125, 247, 1)',
            baseTxUrl: 'https://tezblock.io/transaction',
            baseAddressUrl: 'https://tezblock.io/account',
        },
        {
            type: AssetTypes.LINK,
            unit: 'LINK',
            feeUnit: 'ETH',
            name: 'Chainlink',
            color: 'rgba(55, 91, 210, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.CRO,
            unit: 'CRO',
            feeUnit: 'ETH',
            name: 'Crypto.com Coin',
            color: 'rgba(11, 20, 27, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.OMG,
            unit: 'OMG',
            feeUnit: 'ETH',
            name: 'OmiseGO',
            color: 'rgba(26, 83, 240, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.BAT,
            unit: 'BAT',
            feeUnit: 'ETH',
            name: 'Basic Attention Token',
            color: 'rgba(149,56,219, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.COMP,
            unit: 'COMP',
            feeUnit: 'ETH',
            name: 'Compound',
            color: 'rgba(0, 211, 149, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.DAI,
            unit: 'DAI',
            feeUnit: 'ETH',
            name: 'Dai',
            color: 'rgba(249, 166, 6, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.SNX,
            unit: 'SNX',
            feeUnit: 'ETH',
            name: 'Synthetix Network',
            color: 'rgba(30, 26, 50, 1)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.EOS,
            unit: 'EOS',
            feeUnit: 'EOS',
            name: 'EOSIO',
            color: 'rgba(54, 69, 131, 1)',
            baseTxUrl: 'https://www.bloks.io/transaction',
            baseAddressUrl: 'https://www.bloks.io/account',
        },
        {
            type: AssetTypes.LTC,
            unit: 'LTC',
            feeUnit: 'LTC',
            name: 'Litecoin',
            color: 'rgba(190, 190, 190, 1)',
            baseTxUrl: 'https://blockchair.com/litecoin/transaction',
            baseAddressUrl: 'https://blockchair.com/litecoin/account',
        },
        {
            type: AssetTypes.AAVE,
            unit: 'AAVE',
            feeUnit: 'AAVE',
            name: 'AAVE',
            color: 'rgba(182,80,158,.9)',
            baseTxUrl: 'https://etherscan.io/tx',
            baseAddressUrl: 'https://etherscan.io/address',
        },
        {
            type: AssetTypes.KSM,
            unit: 'KSM',
            feeUnit: 'KSM',
            name: 'Kusama',
            color: 'rgba(182,80,158,.9)',
            baseTxUrl: 'https://polkascan.io/kusama/extrinsic',
            baseAddressUrl: 'https://polkascan.io/kusama/account',
        },
        {
            type: AssetTypes.DOT,
            unit: 'DOT',
            feeUnit: 'DOT',
            name: 'Polkadot',
            color: 'rgba(182,80,158,.9)',
            baseTxUrl: 'https://polkascan.io/polkadot/extrinsic',
            baseAddressUrl: 'https://polkascan.io/polkadot/account',
        },
        {
            type: AssetTypes.ALGO,
            unit: 'ALGO',
            feeUnit: 'ALGO',
            name: 'Algorand',
            color: 'rgba(36,36,34,1)',
            baseTxUrl: 'https://algoexplorer.io/tx',
            baseAddressUrl: 'https://algoexplorer.io/address',
        },
        {
            type: AssetTypes.EUR,
            unit: 'EUR',
            feeUnit: 'EUR',
            name: 'Euro',
        },
        {
            type: AssetTypes.USD,
            unit: 'USD',
            feeUnit: 'USD',
            name: 'US Dollar',
        },
    ];

    allTypes(): AssetTypes[] {
        return this.assets.sort((a, b) => (a.unit > b.unit ? 1 : -1)).map((a) => a.type);
    }

    allCryptoTypes(): AssetTypes[] {
        return this.allTypes().filter((a) => a < 1000);
    }

    txUrl(assetType: AssetTypes): string {
        return this.assets.find((a) => a.type === assetType).baseTxUrl;
    }

    addressUrl(assetType: AssetTypes): string {
        return this.assets.find((a) => a.type === assetType).baseAddressUrl;
    }

    unit(assetType: AssetTypes): string {
        return this.assets.find((a) => a.type === assetType).unit;
    }

    feeUnit(assetType: AssetTypes): string {
        return this.assets.find((a) => a.type === assetType).feeUnit;
    }

    name(assetType: AssetTypes): string {
        return this.assets.find((a) => a.type === assetType).name;
    }

    icon(assetType: AssetTypes): string {
        const unit = this.assets.find((a) => a.type === assetType).unit;
        if (assetType > 1000) {
            return `currency_${unit.toLowerCase()}`;
        }
        return `crypto-asset_${unit.toLowerCase()}`;
    }

    full(assetType: AssetTypes) {
        const obj = this.assets.find((a) => a.type === assetType);
        return `${obj.name} (${obj.unit})`;
    }

    color(assetType: AssetTypes): string {
        return this.assets.find((a) => a.type === assetType).color;
    }
}

export enum BlockchainType {
    Unit = 'unit',
    Name = 'name',
    Icon = 'icon',
    Full = 'full',
}
