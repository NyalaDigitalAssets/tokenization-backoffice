/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';



export interface IExtTradeOrderDto {
    event?: string;
    trade_id?: string;
    order_id?: string;
    client_order_id?: string;
    client_order_id_1?: string;
    client_order_id_2?: string;
    side?: string;
    order_type?: string;
    amount?: number;
    instrument?: string;
    confirmed_price?: number;
    executed_at?: Date;
    currency?: string;
    total_amount?: number;
    order_status?: string;
    seq_no?: number;
}


export class ExtTradeOrderDto extends BaseModel implements IExtTradeOrderDto  {
    event: string;
    trade_id: string;
    order_id: string;
    client_order_id: string;
    client_order_id_1: string;
    client_order_id_2: string;
    side: string;
    order_type: string;
    amount: number;
    instrument: string;
    confirmed_price: number;
    executed_at: Date;
    currency: string;
    total_amount: number;
    order_status: string;
    seq_no: number;

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
            this.event = rawValues.event;
            this.trade_id = rawValues.trade_id;
            this.order_id = rawValues.order_id;
            this.client_order_id = rawValues.client_order_id;
            this.client_order_id_1 = rawValues.client_order_id_1;
            this.client_order_id_2 = rawValues.client_order_id_2;
            this.side = rawValues.side;
            this.order_type = rawValues.order_type;
            this.amount = rawValues.amount;
            this.instrument = rawValues.instrument;
            this.confirmed_price = rawValues.confirmed_price;
            this.executed_at = rawValues.executed_at;
            this.currency = rawValues.currency;
            this.total_amount = rawValues.total_amount;
            this.order_status = rawValues.order_status;
            this.seq_no = rawValues.seq_no;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                event: new FormControl(this.event),
                trade_id: new FormControl(this.trade_id),
                order_id: new FormControl(this.order_id),
                client_order_id: new FormControl(this.client_order_id),
                client_order_id_1: new FormControl(this.client_order_id_1),
                client_order_id_2: new FormControl(this.client_order_id_2),
                side: new FormControl(this.side),
                order_type: new FormControl(this.order_type),
                amount: new FormControl(this.amount),
                instrument: new FormControl(this.instrument),
                confirmed_price: new FormControl(this.confirmed_price),
                executed_at: new FormControl(this.executed_at),
                currency: new FormControl(this.currency),
                total_amount: new FormControl(this.total_amount),
                order_status: new FormControl(this.order_status),
                seq_no: new FormControl(this.seq_no),
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['event'].setValue(this.event);
        this.$formGroup.controls['trade_id'].setValue(this.trade_id);
        this.$formGroup.controls['order_id'].setValue(this.order_id);
        this.$formGroup.controls['client_order_id'].setValue(this.client_order_id);
        this.$formGroup.controls['client_order_id_1'].setValue(this.client_order_id_1);
        this.$formGroup.controls['client_order_id_2'].setValue(this.client_order_id_2);
        this.$formGroup.controls['side'].setValue(this.side);
        this.$formGroup.controls['order_type'].setValue(this.order_type);
        this.$formGroup.controls['amount'].setValue(this.amount);
        this.$formGroup.controls['instrument'].setValue(this.instrument);
        this.$formGroup.controls['confirmed_price'].setValue(this.confirmed_price);
        this.$formGroup.controls['executed_at'].setValue(this.executed_at);
        this.$formGroup.controls['currency'].setValue(this.currency);
        this.$formGroup.controls['total_amount'].setValue(this.total_amount);
        this.$formGroup.controls['order_status'].setValue(this.order_status);
        this.$formGroup.controls['seq_no'].setValue(this.seq_no);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

