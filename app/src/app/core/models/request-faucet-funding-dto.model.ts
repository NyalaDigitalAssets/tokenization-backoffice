/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';



export interface IRequestFaucetFundingDto {
    retailWallets?: Array<string>;
    issuerWallets?: Array<string>;
}


export class RequestFaucetFundingDto extends BaseModel implements IRequestFaucetFundingDto  {
    retailWallets: Array<string>;
    issuerWallets: Array<string>;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.retailWallets = new Array<string>(); 
        this.issuerWallets = new Array<string>(); 

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
            this.fillModelArray<string>(this, 'retailWallets', rawValues.retailWallets, useFormGroupValuesToModel);
            this.fillModelArray<string>(this, 'issuerWallets', rawValues.issuerWallets, useFormGroupValuesToModel);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                retailWallets: new FormArray([]),
                issuerWallets: new FormArray([]),
            });
            // generate FormArray control elements
            this.fillFormArray<string>('retailWallets', this.retailWallets);
            // generate FormArray control elements
            this.fillFormArray<string>('issuerWallets', this.issuerWallets);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.fillFormArray<string>('retailWallets', this.retailWallets);
        this.fillFormArray<string>('issuerWallets', this.issuerWallets);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

