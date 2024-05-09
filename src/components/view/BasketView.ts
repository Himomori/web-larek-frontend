import { IBasket } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class BasketView {
    protected _list: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _price: HTMLElement;

    constructor(readonly template: HTMLElement, protected events: IEvents) {
        this._list = ensureElement<HTMLElement>('.basket__list', template);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', template);
        this._price = ensureElement<HTMLElement>('.basket__price', template);

        this._button.addEventListener('click', () => { this.events.emit('order:open') });

    }

    render(basketData: IBasket): HTMLElement {
        basketData.products.forEach((product, index) => {
            let card_basket = cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket'));
            card_basket.querySelector(".basket__item-index").textContent = String(index + 1);
            card_basket.querySelector(".card__title").textContent = product.title;
            card_basket.querySelector(".card__price").textContent = String(product.price);
            card_basket.querySelector('.basket__item-delete').addEventListener('click', () => {
                this.events.emit('basket:remove', product)
            });

            if (!product.price) {
                card_basket.querySelector(".card__price").textContent = 'Бесценно';
            }

            this._list.append(card_basket);
        });

        this._price.textContent = String(basketData.totalPrice);

        if (basketData.products.length == 0) {
            this._button.setAttribute('disabled', 'disabled');
        }

        return this.template;
    }
}