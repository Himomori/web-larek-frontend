import { IBasket, IOrder, IProduct, ISaveOrderResponse } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export interface IProductApi {
	getProductList: () => Promise<IProduct[]>;
}

export class ProductsApiModel extends Api implements IProductApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			})),
		);
	}

	postOrder(order: IOrder, basket: IBasket): Promise<ISaveOrderResponse> {
		return this.post('/order', {
			"payment": order.paymentMethod,
			"email": order.email,
			"phone": order.phone,
			"address": order.address,
			"total": basket.totalPrice,
			"items": basket.products.map((product: IProduct) => product.id)
		}).then((data: ISaveOrderResponse) => data)

	}
}