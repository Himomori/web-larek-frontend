import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Contacts {
    protected submit_button: HTMLButtonElement;
    protected error: HTMLSpanElement;
    protected inputEmail: HTMLInputElement;
    protected inputPhone: HTMLInputElement;
    email: string;
    phone: string

    constructor(readonly template: HTMLElement, protected events: IEvents) {

        this.inputEmail = ensureElement<HTMLInputElement>('.form__input[name="email"]', template);
        this.inputEmail.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            this.email = value;
            this.validate();
        })

        this.error = ensureElement<HTMLSpanElement>('.form__errors', template);

        this.inputPhone = ensureElement<HTMLInputElement>('.form__input[name="phone"]', template);
        this.inputPhone.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            this.phone = value;
            this.validate();
        })

        this.error = ensureElement<HTMLSpanElement>('.form__errors', template);

        this.submit_button = ensureElement<HTMLButtonElement>('button[type=submit]', template);
        this.submit_button.addEventListener('click', () => {
            this.events.emit('contactsForm:save', {
                email: this.email, phone: this.phone
            })
        });

        template.addEventListener('submit', (e) => e.preventDefault())

    }

    validate() {
        this.error.textContent = '';
        this.submit_button.removeAttribute('disabled');

        if (!this.email) {
            this.error.textContent = 'Необходимо заполнить email'
            this.submit_button.setAttribute('disabled', 'disabled');
        }

        if (!this.phone) {
            this.error.textContent = 'Необходимо заполнить номер телефона'
            this.submit_button.setAttribute('disabled', 'disabled');
        }

    }

    render(): HTMLElement {

        return this.template;

    }

}