export interface IProduct {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    title: string;
}

export interface ICatalog {
    products: IProduct[];
    updateProducts: (products: IProduct[]) => void;
}

export interface IBasket {
    products: IProduct[];
    totalPrice: number;
    totalCount: number;
    add:(product: IProduct) => void;
    haveProduct: (product: IProduct) => boolean;
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

export interface IModalData {
    content: HTMLElement;
}

export interface IFormInputChangeData {
    value: string;
}

export interface IFormPaymentMethodChangeData {
    value: PaymentMethod;
}
