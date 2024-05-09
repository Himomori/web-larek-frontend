import { IBasket, IOrder, PaymentMethod } from "../../types";
import { IEvents } from "../base/events";

export class OrderModel implements IOrder {
    paymentMethod: PaymentMethod;
    address: string;
    email: string;
    phone: string;
    basket: IBasket;
    save() { }

    constructor(protected events: IEvents) {

    }

    clear() {
        this.basket.clear();
        this.address = '';
        this.email = '';
        this.phone = '';
    }
}

