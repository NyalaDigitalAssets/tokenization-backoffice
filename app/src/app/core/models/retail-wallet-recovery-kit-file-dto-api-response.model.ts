/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { RetailWalletRecoveryKitFileDto } from './retail-wallet-recovery-kit-file-dto.model';

export interface IRetailWalletRecoveryKitFileDtoApiResponse {
    errorMessageCodes?: Array<string>;
    data?: RetailWalletRecoveryKitFileDto;
}


export class RetailWalletRecoveryKitFileDtoApiResponse extends BaseModel implements IRetailWalletRecoveryKitFileDtoApiResponse  {
    errorMessageCodes: Array<string>;
    data: RetailWalletRecoveryKitFileDto;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.errorMessageCodes = new Array<string>(); 
        this.data = new RetailWalletRecoveryKitFileDto(); 

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
            this.fillModelArray<string>(this, 'errorMessageCodes', rawValues.errorMessageCodes, useFormGroupValuesToModel);
            this.data.setValues(rawValues.data, useFormGroupValuesToModel);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                errorMessageCodes: new FormArray([]),
                data: this.data.$formGroup,
            });
            // generate FormArray control elements
            this.fillFormArray<string>('errorMessageCodes', this.errorMessageCodes);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.fillFormArray<string>('errorMessageCodes', this.errorMessageCodes);
        this.data.setFormGroupValues();
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

