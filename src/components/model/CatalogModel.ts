import { ICatalog, IProduct } from '../../types';

export class CatalogModel implements ICatalog {
	products: IProduct[] = [];

	updateProducts(products: IProduct[]) {
		this.products = products;
	}
}