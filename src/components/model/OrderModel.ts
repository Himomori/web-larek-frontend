import { IOrder, PaymentMethod } from "../../types";
import { IEvents } from "../base/events";

export class OrderModel implements IOrder {
    paymentMethod: PaymentMethod;
    address: string;
    email: string;
    phone: string;

    constructor(protected events: IEvents) {

    }

    clear() {
        this.address = '';
        this.email = '';
        this.phone = '';
        this.paymentMethod = null;
    }
}

