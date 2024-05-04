export interface IProduct {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    title: string;
}

export interface IBasket {
    products: IProduct[];
    totalPrice: number;
    add:(product: IProduct);
    remove:(product: IProduct);
}

export interface IOrder {
    paymentMethod: PaymentMethod;
    address: string;
    email: string;
    phone: string;
    basket: IBasket;
    save:();
}

export enum PaymentMethod {
    CASH,
    CARD,
}

export interface IProductUI {
    product: IProduct;
}

export interface IProductListUI {
    products: IProductUI[];
}

export interface IPageUI {
    products: IProductListUI;
    counter: number;
}

export interface IBasketUI {
    basket: IBasket;
}

export interface IOrderForm {
    address: string;
    paymentMethod: PaymentMethod;
}

export interface IContactsForm {
    email: string;
    phone: string;
}

export interface ISuccessUI {
    price: number,
}

export interface IModalData {
    content: HTMLElement;
}

export interface IModalUI {
    open:();
    close:();
    render:(data: IModalUI);
}
