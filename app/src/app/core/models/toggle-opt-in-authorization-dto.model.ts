/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { SimpleAccessCredentialsDto } from './simple-access-credentials-dto.model';

export interface IToggleOptInAuthorizationDto {
    credentials?: SimpleAccessCredentialsDto;
    retailWalletIds?: Array<string>;
}


export class ToggleOptInAuthorizationDto extends BaseModel implements IToggleOptInAuthorizationDto  {
    credentials: SimpleAccessCredentialsDto;
    retailWalletIds: Array<string>;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.credentials = new SimpleAccessCredentialsDto(); 
        this.retailWalletIds = new Array<string>(); 

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
            this.credentials.setValues(rawValues.credentials, useFormGroupValuesToModel);
            this.fillModelArray<string>(this, 'retailWalletIds', rawValues.retailWalletIds, useFormGroupValuesToModel);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                credentials: this.credentials.$formGroup,
                retailWalletIds: new FormArray([]),
            });
            // generate FormArray control elements
            this.fillFormArray<string>('retailWalletIds', this.retailWalletIds);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.credentials.setFormGroupValues();
        this.fillFormArray<string>('retailWalletIds', this.retailWalletIds);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}
