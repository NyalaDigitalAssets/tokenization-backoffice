/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { SepaExportTransactionType } from './enums';
import { SepaExportTransactionStatus } from './enums';

export interface ISepaTransactionDto {
    id?: string;
    createdDate?: Date;
    dueDate?: Date;
    processedDate?: Date;
    amount?: number;
    accountId?: string;
    transactionType?: SepaExportTransactionType;
    status?: SepaExportTransactionStatus;
    capitalUuid?: string;
}


export class SepaTransactionDto extends BaseModel implements ISepaTransactionDto  {
    id: string;
    createdDate: Date;
    dueDate: Date;
    processedDate: Date;
    amount: number;
    accountId: string;
    transactionType: SepaExportTransactionType;
    status: SepaExportTransactionStatus;
    capitalUuid: string;

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
            this.id = rawValues.id;
            this.createdDate = rawValues.createdDate;
            this.dueDate = rawValues.dueDate;
            this.processedDate = rawValues.processedDate;
            this.amount = rawValues.amount;
            this.accountId = rawValues.accountId;
            this.transactionType = rawValues.transactionType;
            this.status = rawValues.status;
            this.capitalUuid = rawValues.capitalUuid;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                id: new FormControl(this.id),
                createdDate: new FormControl(this.createdDate),
                dueDate: new FormControl(this.dueDate),
                processedDate: new FormControl(this.processedDate),
                amount: new FormControl(this.amount),
                accountId: new FormControl(this.accountId),
                transactionType: new FormControl(this.transactionType, [enumValidator(SepaExportTransactionType), ]),
                status: new FormControl(this.status, [enumValidator(SepaExportTransactionStatus), ]),
                capitalUuid: new FormControl(this.capitalUuid),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['id'].setValue(this.id);
        this.$formGroup.controls['createdDate'].setValue(this.createdDate);
        this.$formGroup.controls['dueDate'].setValue(this.dueDate);
        this.$formGroup.controls['processedDate'].setValue(this.processedDate);
        this.$formGroup.controls['amount'].setValue(this.amount);
        this.$formGroup.controls['accountId'].setValue(this.accountId);
        this.$formGroup.controls['transactionType'].setValue(this.transactionType);
        this.$formGroup.controls['status'].setValue(this.status);
        this.$formGroup.controls['capitalUuid'].setValue(this.capitalUuid);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

