import { IBasket, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class BasketModel implements IBasket {
	products: IProduct[] = [];
	totalPrice: number = 0;
	totalCount: number = 0;

	constructor(protected events: IEvents) {
	}

	add(product: IProduct): void {
		let index = this.products.indexOf(product);
		if (index === -1) {
			this.products.push(product);
			this.totalCount++;
			this.totalPrice = product.price + this.totalPrice;
			this.events.emit('basket:updateCounter');
		}
	}

	remove(product: IProduct): void {
		let index = this.products.indexOf(product);

		if (index > -1) {
			this.products.splice(index, 1);
			this.totalCount--;
			this.totalPrice = this.totalPrice - product.price;
			this.events.emit('basket:updateCounter');
		}
	}

	clear() {
		this.products = [];
		this.totalCount = 0;
		this.totalPrice = 0;
		this.events.emit('basket:updateCounter');
	}

	haveProduct(product: IProduct): boolean {
		return this.products.indexOf(product) != -1;
	}
}
