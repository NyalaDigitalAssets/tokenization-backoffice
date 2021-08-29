/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';



export interface ITokenizedAssetToRetailWallet {
    retailWalletId?: string;
    amount?: number;
    message?: string;
}


export class TokenizedAssetToRetailWallet extends BaseModel implements ITokenizedAssetToRetailWallet  {
    retailWalletId: string;
    amount: number;
    message: string;

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
            this.retailWalletId = rawValues.retailWalletId;
            this.amount = rawValues.amount;
            this.message = rawValues.message;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                retailWalletId: new FormControl(this.retailWalletId),
                amount: new FormControl(this.amount),
                message: new FormControl(this.message),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['retailWalletId'].setValue(this.retailWalletId);
        this.$formGroup.controls['amount'].setValue(this.amount);
        this.$formGroup.controls['message'].setValue(this.message);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

