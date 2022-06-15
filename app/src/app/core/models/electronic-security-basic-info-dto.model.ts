/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';



export interface IElectronicSecurityBasicInfoDto {
    name?: string;
    issuerWalletPubKey?: string;
    total?: number;
}


export class ElectronicSecurityBasicInfoDto extends BaseModel implements IElectronicSecurityBasicInfoDto  {
    name: string;
    issuerWalletPubKey: string;
    total: number;

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
            this.issuerWalletPubKey = rawValues.issuerWalletPubKey;
            this.total = rawValues.total;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                name: new FormControl(this.name),
                issuerWalletPubKey: new FormControl(this.issuerWalletPubKey),
                total: new FormControl(this.total),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['name'].setValue(this.name);
        this.$formGroup.controls['issuerWalletPubKey'].setValue(this.issuerWalletPubKey);
        this.$formGroup.controls['total'].setValue(this.total);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

