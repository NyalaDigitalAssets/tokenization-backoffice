/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';



export interface ICustomerCompanyDetailDto {
    name: string;
    registerNumber: string;
    fullAddress: string;
    email: string;
}


export class CustomerCompanyDetailDto extends BaseModel implements ICustomerCompanyDetailDto  {
    name: string;
    registerNumber: string;
    fullAddress: string;
    email: string;

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
            this.name = rawValues.name;
            this.registerNumber = rawValues.registerNumber;
            this.fullAddress = rawValues.fullAddress;
            this.email = rawValues.email;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                name: new FormControl(this.name, [Validators.required, Validators.maxLength(255), ]),
                registerNumber: new FormControl(this.registerNumber, [Validators.required, Validators.maxLength(255), ]),
                fullAddress: new FormControl(this.fullAddress, [Validators.required, Validators.maxLength(255), ]),
                email: new FormControl(this.email, [Validators.required, Validators.maxLength(64), ]),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['name'].setValue(this.name);
        this.$formGroup.controls['registerNumber'].setValue(this.registerNumber);
        this.$formGroup.controls['fullAddress'].setValue(this.fullAddress);
        this.$formGroup.controls['email'].setValue(this.email);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}
