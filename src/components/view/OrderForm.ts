import { IOrder, PaymentMethod } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class OrderForm {
    protected card_button: HTMLButtonElement;
    protected cash_button: HTMLButtonElement;
    protected submit_button: HTMLButtonElement;
    protected error: HTMLSpanElement;
    protected inputAddress: HTMLInputElement;

    constructor(readonly template: HTMLElement, protected events: IEvents) {

        this.inputAddress = ensureElement<HTMLInputElement>('.form__input', template);
        this.inputAddress.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            events.emit('orderForm:addressChanged', { value: target.value })
            this.validate();
        });

        this.error = ensureElement<HTMLSpanElement>('.form__errors', template);

        this.card_button = ensureElement<HTMLButtonElement>('button[name=card]', template);
        this.card_button.addEventListener('click', () => {
            this.card_button.classList.add('button_alt-active');
            this.cash_button.classList.remove('button_alt-active');
            events.emit('orderForm:paymentMethodChanged', { value: PaymentMethod.card })
            this.validate();
        });


        this.cash_button = ensureElement<HTMLButtonElement>('button[name=cash]', template);
        this.cash_button.addEventListener('click', () => {
            this.cash_button.classList.add('button_alt-active');
            this.card_button.classList.remove('button_alt-active');
            events.emit('orderForm:paymentMethodChanged', { value: PaymentMethod.cash })
            this.validate();
        });

        this.submit_button = ensureElement<HTMLButtonElement>('.order__button', template);
        this.submit_button.addEventListener('click', () => {
            this.events.emit('orderForm:save')
        });

        template.addEventListener('submit', (e) => e.preventDefault())

    }

    validate() {
        this.error.textContent = '';
        this.submit_button.removeAttribute('disabled');

        if (!this.inputAddress.value) {
            this.error.textContent = 'Необходимо заполнить адрес'
            this.submit_button.setAttribute('disabled', 'disabled');
        }
        
        if (!this.cash_button.classList.contains("button_alt-active") &&
            !this.card_button.classList.contains("button_alt-active")) 
        {
            this.error.textContent = 'Необходимо выбрать способ оплаты'
            this.submit_button.setAttribute('disabled', 'disabled');
        }
    }

    render(order: IOrder): HTMLElement {
        if (order.address) {
            this.inputAddress.value = order.address;
            this.validate();
        }

        this.cash_button.classList.remove('button_alt-active');
        this.card_button.classList.remove('button_alt-active');

        if (order.paymentMethod == PaymentMethod.card) {
            this.card_button.classList.add('button_alt-active');
            this.validate();
        }
        if (order.paymentMethod == PaymentMethod.cash) {
            this.cash_button.classList.add('button_alt-active');
            this.validate();
        }

        return this.template;
    }
}