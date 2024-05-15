import { IFormInputChangeData, IOrder, PaymentMethod } from '../../types';
import { IEvents } from "../base/events";

export class OrderModel implements IOrder {
    paymentMethod: PaymentMethod;
    address: string;
    email: string;
    phone: string;

    constructor(protected events: IEvents) {

    }

    updateField(data: IFormInputChangeData) {

    }

    clear() {
        this.address = '';
        this.email = '';
        this.phone = '';
        this.paymentMethod = null;
    }
}

