import { PaymentMethod } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class OrderForm {
    protected card_button: HTMLButtonElement;
    protected cash_button: HTMLButtonElement;
    protected submit_button: HTMLButtonElement;
    protected error: HTMLSpanElement;
    protected input: HTMLInputElement;
    paymentMethod: PaymentMethod;
    address: string;

    constructor(readonly template: HTMLElement, protected events: IEvents) {

        this.input = ensureElement<HTMLInputElement>('.form__input', template);
        this.input.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            this.address = value;
            this.validate();
        });

        this.error = ensureElement<HTMLSpanElement>('.form__errors', template);

        this.card_button = ensureElement<HTMLButtonElement>('button[name=card]', template);
        this.card_button.addEventListener('click', () => { 
            this.paymentMethod = PaymentMethod.card;
            this.card_button.classList.add('button_alt-active');
            this.cash_button.classList.remove('button_alt-active');
            this.validate();
        });


        this.cash_button = ensureElement<HTMLButtonElement>('button[name=cash]', template);
        this.cash_button.addEventListener('click', () => { 
            this.paymentMethod = PaymentMethod.cash;
            this.cash_button.classList.add('button_alt-active');
            this.card_button.classList.remove('button_alt-active');
            this.validate();
        });

        this.submit_button = ensureElement<HTMLButtonElement>('.order__button', template);
        this.submit_button.addEventListener('click', () => { this.events.emit('orderForm:save', {
            paymentMethod:this.paymentMethod, address:this.address
        })});

        template.addEventListener('submit', (e) => e.preventDefault())
  
    }

    validate() {
        this.error.textContent = '';
        this.submit_button.removeAttribute('disabled');

        if(!this.address) {
            this.error.textContent = 'Необходимо заполнить адрес'
            this.submit_button.setAttribute('disabled', 'disabled');
        }

        if(!this.paymentMethod) {
            this.error.textContent = 'Необходимо выбрать способ оплаты'
            this.submit_button.setAttribute('disabled', 'disabled');
        }
    }

    render(): HTMLElement {

    return this.template;
            
    }
}