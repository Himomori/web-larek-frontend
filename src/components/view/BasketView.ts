import { IBasket } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class BasketView {
    protected _list: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _price: HTMLElement;
    protected _basket: IBasket;

    constructor(readonly template: HTMLElement, protected events: IEvents) {
        this._list = ensureElement<HTMLElement>('.basket__list', template);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', template);
        this._price = ensureElement<HTMLElement>('.basket__price', template);

        this._button.addEventListener('click', () => { this.events.emit('order:open') });

    }

    render(basketData: IBasket): HTMLElement {
        this._basket = basketData
        basketData.products.forEach((product, index) => {
            let card_basket = cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket'));
            card_basket.querySelector(".basket__item-index").textContent = String(index + 1);
            card_basket.querySelector(".card__title").textContent = product.title;
            card_basket.querySelector(".card__price").textContent = String(product.price || 0);
            card_basket.querySelector('.basket__item-delete').addEventListener('click', () => {
                this.events.emit('basket:remove', product)
                card_basket.remove();
                this.update();
            });
            this._list.append(card_basket);
        });

        this.update();
        
        return this.template;
    }
    update(): void {
        if (this._basket.products.length == 0 || this._basket.totalPrice == 0) {
            this._button.setAttribute('disabled', 'disabled');
        }
        this._price.textContent = String(this._basket.totalPrice);
    }
}