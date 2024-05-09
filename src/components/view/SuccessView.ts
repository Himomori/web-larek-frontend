import { ISaveOrderResponse } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class SuccessView {
    protected description: HTMLElement;
    protected button_close: HTMLButtonElement;

    constructor(readonly template: HTMLElement, protected events: IEvents) {

        this.description = ensureElement<HTMLElement>('.order-success__description', template)
        this.button_close = ensureElement<HTMLButtonElement>('.order-success__close', template);
        this.button_close.addEventListener('click', () => {
            this.events.emit('close:modal')
        });
    }

    render(data: ISaveOrderResponse): HTMLElement {

        this.description.textContent = 'Списано  ' + String(data.total) + '  синапсов'

        return this.template;
    }
}
