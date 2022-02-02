/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';



export interface IInt32ApiResponse {
    errorMessageCodes?: Array<string>;
    data?: number;
}


export class Int32ApiResponse extends BaseModel implements IInt32ApiResponse  {
    errorMessageCodes: Array<string>;
    data: number;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.errorMessageCodes = new Array<string>(); 

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
            this.data = rawValues.data;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                errorMessageCodes: new FormArray([]),
                data: new FormControl(this.data),
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
        this.$formGroup.controls['data'].setValue(this.data);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}
