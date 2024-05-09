import { IBasket, IOrder, IProduct } from '../../types';
import { IEvents } from '../base/events';
import { BasketModel } from './BasketModel';
import { OrderModel } from './OrderModel';

export class AppState {
	catalog: IProduct[];
	basket: IBasket;
	order: IOrder;

	constructor(protected events: IEvents) {
		this.basket = new BasketModel(events);
		this.order = new OrderModel(events);
	}

	setProducts(products: IProduct[]) {
		this.catalog = products;
		this.events.emit('catalog:updateProducts');
	}
}