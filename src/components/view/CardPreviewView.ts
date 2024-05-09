import { IProduct } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class CardPreviewView {
	protected _image: HTMLImageElement;
	protected _category: HTMLSpanElement;
	protected _title: HTMLHeadingElement;
	protected _description: HTMLParagraphElement;
	protected _button: HTMLButtonElement;
	protected _price: HTMLSpanElement;
	protected _selectedProduct: IProduct;

	constructor(readonly template: HTMLElement, protected events: IEvents) {
		this._description = ensureElement<HTMLParagraphElement>('.card__text', template);
		this._button = ensureElement<HTMLButtonElement>('.card__button', template);
		this._category = ensureElement<HTMLSpanElement>('.card__category', template);
		this._image = ensureElement<HTMLImageElement>('.card__image', template);
		this._price = ensureElement<HTMLSpanElement>('.card__price', template);
		this._title = ensureElement<HTMLHeadingElement>('.card__title', template);
		this._button.addEventListener('click', () => {
			this.events.emit('basket:add', this._selectedProduct)
			this.events.emit('close:modal')
		});

	}

	render(data: IProduct): HTMLElement {
		this._description.textContent = data.description;
		this._category.textContent = data.category;
		this._image.src = data.image;
		this._title.textContent = data.title;
		this._price.textContent = String(data.price);
		this._selectedProduct = data;

		if (!data.price) {
			this._price.textContent = 'Бесценно';
		}

		return this.template;
	}
}