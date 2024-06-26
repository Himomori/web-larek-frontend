import './scss/styles.scss';

import { ProductsApiModel } from './components/model/ProductsApiModel';
import { API_URL, CDN_URL } from './utils/constants';
import {
	IBasket,
	ICatalog,
	IFormInputChangeData,
	IFormPaymentMethodChangeData,
	IOrder,
	IProduct,
	ISaveOrderResponse,
	PaymentMethod,
} from './types';
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
import { CatalogModel } from './components/model/CatalogModel';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new ProductsApiModel(CDN_URL, API_URL);

const catalog: ICatalog = new CatalogModel();
const basket: IBasket = new BasketModel(events);
const order: IOrder = new OrderModel(events);

const pageView = new PageView(events, cardCatalogTemplate);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


// Обновление каталога при получении товаров
events.on('catalog:updateProducts', () => {
	pageView.updateCatalog(catalog);
});

// Выбор карточки в каталоге
events.on('card:select', (product: IProduct) => {
	const card = new CardPreviewView(cloneTemplate(cardPreviewTemplate), events);
	modal.render({content: card.render(product, basket)});
});

// Открытие корзины
events.on('basket:open', () => {
	const basketView = new BasketView(cloneTemplate(basketTemplate), events);
	modal.render({content: basketView.render(basket)});
});

// Открытие окна доставки
events.on('order:open', () => {
	const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
	modal.render({content: orderForm.render(order)});
});

// Обновление адреса у заказа
events.on('orderForm:addressChanged', (data: IFormInputChangeData) => {
	order.address = data.value;
})

// Обновление способа оплаты у заказа
events.on('orderForm:paymentMethodChanged', (data: IFormPaymentMethodChangeData) => {
	order.paymentMethod = data.value;
})

// Обновление почты у заказа
events.on('contactsForm:emailChanged', (data: IFormInputChangeData) => {
	order.email = data.value;
})

// Обновление телефона у заказа
events.on('contactsForm:phoneChanged', (data: IFormInputChangeData) => {
	order.phone = data.value;
})

// Отрытие формы контактов
events.on('orderForm:save', () => {
	events.emit('contacts:open');
})

// Отправка заказа в апи
events.on('contactsForm:save', () => {
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
	modal.render({content: constants.render(order)});
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
		catalog.updateProducts(products);
		events.emit('catalog:updateProducts');
	})
	.catch(err => {
		console.error(err);
	});

