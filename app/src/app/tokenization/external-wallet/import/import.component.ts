import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Blockchains, CreateExternalRetailWalletDto, ImportExternalRetailWalletDto } from 'src/app/core/models';
import { CustomApiService } from 'src/app/core/services/ganymede.service';


@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
    constructor(
        private ngxCsvParser: NgxCsvParser,
        private customApi: CustomApiService,
        private snackBar: MatSnackBar) { }

    dummyData = [
        {
            PublicAddress: "<Public Address>"
        }
    ];

    Blockchains = Blockchains;
    allowedBlockchains = [Blockchains.Algorand, Blockchains.Stellar];
    selectedBlockchain = undefined;
    walletsPrefix = "";

    model = new ImportExternalRetailWalletDto();
    submitted = false;

    resultColumns = ['WalletId', 'Result'];
    headerContent: string;

    ngOnInit(): void {
        this.headerContent = ``;
    }

    loadExternalRetailWallets(file: any) {
        this.ngxCsvParser
            .parse(file, { header: false, delimiter: ',' })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    this.model.wallets = new Array<CreateExternalRetailWalletDto>();
                    for (let i = 0; i < result.length; i++) {
                        var erw = new CreateExternalRetailWalletDto();
                        erw.publicAddress = result[i][0];
                        erw.blockchain = this.selectedBlockchain;
                        erw.name = `${this.walletsPrefix}-${(new Date()).valueOf()}`;
                        this.model.wallets.push(erw);
                    }
                },  
                (error) => {
                    console.error('Error', error);
                }
            );
    }
    reset() {

    }
    downloadCSVTemplate() {
        const rows = this.dummyData.map((o) => `${o.PublicAddress}`);
        const data = rows.join('\r\n');
        const a = document.createElement('a');
        a.download = 'import-wallet-template.csv';
        a.href = `data:text/csv;charset=UTF-8,\ufeff${data}`;
        a.target = '_blank';
        a.click();
    }
    submit() {
        this.customApi.postExternalRetailWalletExternalRetailWallet(this.model).subscribe(
            (results) => {
                this.submitted = true;
                this.snackBar.open('Imported!', '', {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    politeness: 'polite',
                });
            },
            () => { },
            () => this.reset()
        );
    }
}
