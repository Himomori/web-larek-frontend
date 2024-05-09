import { IProduct } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class CardCatalogView {
	protected _image: HTMLImageElement;
	protected _category: HTMLSpanElement;
	protected _title: HTMLHeadingElement;
	protected _price: HTMLSpanElement;
	protected _selectedProduct: IProduct;

	constructor(readonly template: HTMLElement, protected events: IEvents) {
		this._image = ensureElement<HTMLImageElement>('.card__image', template);
		this._category = ensureElement<HTMLSpanElement>('.card__category', template);
		this._title = ensureElement<HTMLHeadingElement>('.card__title', template);
		this._price = ensureElement<HTMLSpanElement>('.card__price', template);

		template.addEventListener('click', () => events.emit('card:select', this._selectedProduct));
	}

	render(data: IProduct): HTMLElement {
		this._image.src = data.image;
		this._title.textContent = data.title;
		this._price.textContent = String(data.price);
		this._category.textContent = data.category;
		this._selectedProduct = data;

		if (!data.price) {
			this._price.textContent = 'Бесценно';
		}

		return this.template;
	}
}