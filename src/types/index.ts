export interface IProduct {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    title: string;
}

export interface IBasketView {
    title: string;
    list: string;
    items: string;
    total: string;
    price: number;
}

export interface IBasket {
    products: IProduct[];
    totalPrice: number;
    totalCount: number;
    add:(product: IProduct) => void;
    remove:(product: IProduct) => void;
    clear:() => void;
}

export interface IOrder {
    paymentMethod: PaymentMethod;
    address: string;
    email: string;
    phone: string;
    clear:() => void;
}

export interface ISaveOrderResponse {
    id: string;
    total: number;
}

export enum PaymentMethod {
    card = 'Безналичный',
    cash = 'Наличный',
}

export interface IOrderFormData {
    address: string;
    paymentMethod: PaymentMethod;
}

export interface IContactsFormData {
    email: string;
    phone: string;
}

export interface IModalData {
    content: HTMLElement;
}
