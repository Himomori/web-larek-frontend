import { IEvents } from '../base/events';
import { ICatalog, IProduct } from '../../types';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { CardCatalogView } from './CardCatalogView';

export class PageView {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(protected events: IEvents, readonly cardCatalogTemplate: HTMLTemplateElement) {
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {

			this.events.emit('basket:open');
		});
	}

	updateCounter(counter: Number): void {
		this._counter.textContent = String(counter);
	}

	updateCatalog(catalog: ICatalog): void {
		this._catalog.textContent = '';
		catalog.products.forEach((product: IProduct) => {
			let card = new CardCatalogView(cloneTemplate(this.cardCatalogTemplate), this.events);
			this._catalog.append(card.render(product));
		});
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
