import './scss/styles.scss';

import { ProductsApiModel } from './components/model/ProductsApiModel';
import { API_URL, CDN_URL } from './utils/constants';
import { IBasket, IContactsFormData, IOrder, IOrderFormData, IProduct, ISaveOrderResponse } from './types';
import { EventEmitter } from './components/base/events';
import { PageView } from './components/view/PageView';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/view/Modal';
import { CardPreviewView } from './components/view/CardPreviewView';
import { BasketView } from './components/view/BasketView';
import { OrderForm } from './components/view/OrderForm';
import { Contacts } from './components/view/ContactsForm';
import { SuccessView } from './components/view/SuccessView';
import { BasketModel } from './components/model/BasketModel';
import { OrderModel } from './components/model/OrderModel';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new ProductsApiModel(CDN_URL, API_URL);

let catalog: IProduct[]= [];
let basket: IBasket = new BasketModel(events);
let order: IOrder = new OrderModel(events);

const pageView = new PageView(events, cardCatalogTemplate);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


// Обновление каталога при получении товаров
events.on('catalog:updateProducts', () => {
	pageView.updateCatalog(catalog);
});

// Выбор карточки в каталоге
events.on('card:select', (product: IProduct) => {
	const card = new CardPreviewView(cloneTemplate(cardPreviewTemplate), events);
	modal.render({content: card.render(product)});
});

// Открытие корзины
events.on('basket:open', () => {
	const basketView = new BasketView(cloneTemplate(basketTemplate), events);
	modal.render({content: basketView.render(basket)});
});

// Открытие окна доставки
events.on('order:open', () => {
	const order = new OrderForm(cloneTemplate(orderTemplate), events);
	modal.render({content: order.render()});
});

// сохранение адреса и способа оплаты
events.on('orderForm:save', (data: IOrderFormData) => { 
	order.address = data.address;
	order.paymentMethod = data.paymentMethod;
	events.emit('contacts:open');
})

// сохранение email и phone
events.on('contactsForm:save', (data: IContactsFormData) => { 
	order.email = data.email;
	order.phone = data.phone;
	api.postOrder(order, basket)
	.then(function(response: ISaveOrderResponse) {
		events.emit('success:open', response)
        // очистка заказа и корзины
		order.clear();
        basket.clear();
	})
	.catch(err => {
		console.error(err);
	});
})

// Открытие окна контактов
events.on('contacts:open', () => {
	const constants = new Contacts(cloneTemplate(contactsTemplate), events);
	modal.render({content: constants.render()});
});

// открытие окна успешной покупки
events.on('success:open', (response: ISaveOrderResponse) => {
	const success = new SuccessView(cloneTemplate(successTemplate), events);
	modal.render({content: success.render(response)});
});

// закрытие модального окна по кнопке
events.on('close:modal', () => {
	modal.close();
})

// Добавление в корзину
events.on('basket:add', (product: IProduct) => {
	basket.add(product);
});

// удаление из корзины
events.on('basket:remove', (product: IProduct) => {
	basket.remove(product);
	events.emit('basket:open');
});

// Обновление счетчика корзины на странице
events.on('basket:updateCounter', () => {
	pageView.updateCounter(basket.totalCount);
})


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	pageView.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	pageView.locked = false;
});

// получение карточек с сервера
api.getProductList()
	.then(function(products: IProduct[]) {
		catalog = products;
		events.emit('catalog:updateProducts');
	})
	.catch(err => {
		console.error(err);
	});

