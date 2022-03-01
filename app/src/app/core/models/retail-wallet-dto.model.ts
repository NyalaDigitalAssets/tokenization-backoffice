/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { Blockchains } from './enums';
import { BalancesInDecimalDto } from './balances-in-decimal-dto.model';

export interface IRetailWalletDto {
    id?: string;
    blockchain?: Blockchains;
    publicAddress?: string;
    balance?: BalancesInDecimalDto;
    seedLockStatus?: boolean;
    retailWalletSeedId?: string;
}


export class RetailWalletDto extends BaseModel implements IRetailWalletDto  {
    id: string;
    blockchain: Blockchains;
    publicAddress: string;
    balance: BalancesInDecimalDto;
    seedLockStatus: boolean;
    retailWalletSeedId: string;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.balance = new BalancesInDecimalDto(); 

        if (values) {
            this.setValues(values, useFormGroupValuesToModel);
        }
    }

    /**
     * set the values.
     * @param values Can be used to set a webapi response to this newly constructed model
    */
    setValues(values: any, useFormGroupValuesToModel = false): void {
        if (values) {
            const rawValues = this.getValuesToUse(values, useFormGroupValuesToModel);
            this.id = rawValues.id;
            this.blockchain = rawValues.blockchain;
            this.publicAddress = rawValues.publicAddress;
            this.balance.setValues(rawValues.balance, useFormGroupValuesToModel);
            this.seedLockStatus = rawValues.seedLockStatus;
            this.retailWalletSeedId = rawValues.retailWalletSeedId;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                id: new FormControl(this.id),
                blockchain: new FormControl(this.blockchain, [enumValidator(Blockchains), ]),
                publicAddress: new FormControl(this.publicAddress),
                balance: this.balance.$formGroup,
                seedLockStatus: new FormControl(this.seedLockStatus),
                retailWalletSeedId: new FormControl(this.retailWalletSeedId),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['id'].setValue(this.id);
        this.$formGroup.controls['blockchain'].setValue(this.blockchain);
        this.$formGroup.controls['publicAddress'].setValue(this.publicAddress);
        this.balance.setFormGroupValues();
        this.$formGroup.controls['seedLockStatus'].setValue(this.seedLockStatus);
        this.$formGroup.controls['retailWalletSeedId'].setValue(this.retailWalletSeedId);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

