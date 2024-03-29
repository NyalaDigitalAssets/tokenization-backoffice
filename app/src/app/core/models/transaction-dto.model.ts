/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { TransactionActions } from './enums';

export interface ITransactionDto {
    txAction?: TransactionActions;
    created?: Date;
    txId?: string;
}


export class TransactionDto extends BaseModel implements ITransactionDto  {
    txAction: TransactionActions;
    created: Date;
    txId: string;

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
            this.txAction = rawValues.txAction;
            this.created = rawValues.created;
            this.txId = rawValues.txId;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                txAction: new FormControl(this.txAction, [enumValidator(TransactionActions), ]),
                created: new FormControl(this.created),
                txId: new FormControl(this.txId),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['txAction'].setValue(this.txAction);
        this.$formGroup.controls['created'].setValue(this.created);
        this.$formGroup.controls['txId'].setValue(this.txId);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

