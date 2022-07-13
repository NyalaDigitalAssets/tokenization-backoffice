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

export interface ICreateExternalRetailWalletDto {
    blockchain?: Blockchains;
    publicAddress?: string;
    name?: string;
    nativeCryptoAssetId?: string;
}


export class CreateExternalRetailWalletDto extends BaseModel implements ICreateExternalRetailWalletDto  {
    blockchain: Blockchains;
    publicAddress: string;
    name: string;
    nativeCryptoAssetId: string;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();

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
            this.blockchain = rawValues.blockchain;
            this.publicAddress = rawValues.publicAddress;
            this.name = rawValues.name;
            this.nativeCryptoAssetId = rawValues.nativeCryptoAssetId;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                blockchain: new FormControl(this.blockchain, [enumValidator(Blockchains), ]),
                publicAddress: new FormControl(this.publicAddress),
                name: new FormControl(this.name),
                nativeCryptoAssetId: new FormControl(this.nativeCryptoAssetId),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['blockchain'].setValue(this.blockchain);
        this.$formGroup.controls['publicAddress'].setValue(this.publicAddress);
        this.$formGroup.controls['name'].setValue(this.name);
        this.$formGroup.controls['nativeCryptoAssetId'].setValue(this.nativeCryptoAssetId);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}
