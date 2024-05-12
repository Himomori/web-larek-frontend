# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура
В проекте используется принцип MVP (Model-View-Presenter)


## Базовый код
### Класс `Api`
Представляет собой основной класс для работы с API. Имеет следущие свойства и методы.

#### Методы:

* `get(url: string)` выполняет GET запрос
* `post(uri: string, data: object, method: ApiPostMethods = 'POST')` выполняет POST запрос с переданными данными
* `handleResponse(response: Response)` обрабатывает ответ от сервера

### Класс `EventEmitter`
Это реализующий интерфейс `IEvents` который представляет собой брокер событий. Он позволяет устанавливать обработчики на события, инициировать события с данными, слушать все события, сбрасывать обработчики и создавать коллбеки-триггеры для генерации событий при вызове. Класс содержит методы для управления подписчиками на события и передачи данных при их инициировании. Имеет следущие методы.

#### Методы:

* `on` метод для установки обработчика на определенное событие.
* `off` метод для удаление обработчика с определенного события.
* `emit` метод для инициализации события.
* `onAll` метод для установки обработчика на все события.
* `offAll` метод для удаления всех обработчиков события.
* `trigger` метод для создания коллбека-триггера, который генерирует событие при вызове

## Компоненты модели данных (бизнес-логика)

### Класс `ProductsApiModel` 
Класс, который расширяет базовый класс Api и реализует интерфейс IProductApi. Он предназначен для взаимодействия с API продуктов и заказов. Принимает параметры `cdn` (URL для CDN изображений). Обеспечивает основные функции для работы с продуктами и оформления заказов в приложении, включая загрузку данных о продуктах и отправку информации о заказах.

#### Методы:

* `getProductList(): Promise<IProduct[]>` получает список продуктов с сервера и возвращает промис с массивом продуктов.
* `postOrder(order: IOrder): Promise<ISaveOrderResponse>` отправляет данные заказа на сервер ,возвращает промис с ответом сервера содержащим идентификатор и общую стоимость заказа.

### Класс `BasketModel`
Класс, реализующий интерфейс IBasket, представляющий модель корзины. Он содержит массив продуктов products, общую цену totalPrice и общее количество продуктов totalCount, содержит в себе следущие методы.

#### Методы:

* `add(product: IProduct)` добавляет продукт в корзину, увеличивая общее количество продуктов и общую цену.
* `remove(product: IProduct)` удаляет продукт из корзины, уменьшая общее количество продуктов и общую цену.
* `clear()` отчищает корзину
* `haveProduct(product: IProduct)` проверяет, содержится ли продукт в корзине, возвращая true или false.

### Интерфейс `IBasket`
Описание корзины: список товаров, возможность добавить или удалить товары из корзины.

### Класс `CatalogModel` 
Реализует интерфейс ICatalog. Этот класс предназначен для управления каталогом продуктов.

#### Метод: 
* `updateProducts(products: IProduct[])` этот метод принимает массив продуктов и обновляет текущий каталог продуктов, заменяя старый массив новым. Это позволяет динамически обновлять список продуктов в каталоге.

### Интерфейс `ICatalog`
Определяет структуру данных для управления каталогом продуктов, включая метод для обновления этих продуктов.

#### Метод: 
* `updateProducts(products: IProduct[])` метод, который принимает массив продуктов и предназначен для обновления списка продуктов в каталоге.

### Класс `OrderModel`
Класс, реализующий интерфейс IOrder. Он содержит свойства `paymentMethod` (способ оплаты), `address` (адрес), `email` (электронная почта), `phone` (телефон).

#### Метод:

* `clear()` отчищает заказ

### Интерфейс `IOrder`
Описание заказа пользователя: Вид оплаты, адрес, телефон, почта.
Также предоставляет возможность очистить заказ.

## Компоненты представления

### Класс `BaseCardView`
Предназначен для управления визуальным представлением элементов

#### Метод:

* `getCategoryColor(category: string): string` этот метод принимает строку category, которая представляет категорию элемента, и возвращает строку, представляющую цвет в формате HEX.

### Класс `CardCatalogView`
Это класс, отвечающий за представление карточки продукта в каталоге. Наследуется от `BaseCardView` 

#### Метод:

* `render(data: IProduct): HTMLElement` метод для отображения данных продукта на карточке. Устанавливает изображение, название, цену, категорию продукта и её цвет. Обрабатывает случай, когда цена продукта отсутствует, заменяя ее на "Бесценно". Возвращает шаблон карточки.

### Класс `PageView`
Класс, представляющий представление страницы. Он содержит свойства для счетчика, каталога продуктов, обертки страницы и корзины.

#### Методы и свойства: 

* `updateCounter(counter: Number)` Метод для обновления счетчика корзины. Устанавливает текст счетчика в соответствии с переданным значением.
* `updateCatalog(products: IProduct[])` Метод для обновления каталога продуктов.
* `set locked(value: boolean)` Свойство для блокировки/разблокировки прокрутки страницы при открытом модальном окне.

### Класс `CardPreviewView`
Класс, представляющий предварительный просмотр карточки продукта.

#### Методы: 

* `render(data: IProduct): HTMLElement` Метод для отображения данных продукта в предварительном просмотре. Устанавливает описание, категорию и ее цвет, изображение, название, цену продукта

### Класс `BasketView`
Класс, представляющий представление корзины.

#### Метод: 

* `render(basketData: IBasket): HTMLElement` Метод для отображения данных корзины.

Для каждого продукта в корзине создаёт карточку продукта на основе шаблона, обновляет информацию о продукте и добавляет обработчик события удаления продукта из корзины.

* `update(): void` обновляет состояние кнопки корзины: если корзина пуста или общая стоимость равна 0, кнопка блокируется, обновляет отображение общей стоимости продуктов в корзине.

### Класс `OrderForm`
Отвечает за отображение формы ввода метода оплаты и адреса. Он содержит в себе свойства для кнопок выбора способа оплаты, кнопки подтверждения заказа, сообщения об ошибке, поле ввода адреса, выбранный способ оплаты и адрес.

#### Методы: 

* `validate()` Метод для валидации формы. Проверяет наличие адреса и выбор способа оплаты. Выводит сообщения об ошибке и блокирует кнопку подтверждения заказа при невалидных данных.
* `render(): HTMLElement:` Метод для отображения формы. Возвращает шаблон формы, обновляет элементы формы согласно данным заказа (адрес, способ оплаты).

### Класс `ContactsForm`
Отвечает за отображение формы ввода имени и email пользователя. Содержит в себе свойства сообщения об ошибке, полей ввода электронной почты и телефона, а также свойства для хранения электронной почты и номера телефона

#### Методы: 

* `validate()` Метод для валидации формы. Проверяет наличие электронной почты и номера телефона. Выводит сообщения об ошибке и блокирует кнопку подтверждения при невалидных данных.
* `render() HTMLElement` Метод для отображения формы. Возвращает шаблон формы, обновляет элементы формы согласно данным заказа (email, номер телефона).

### Класс `SuccessView`
Отвечает за отображение сообщения об успешном заказе. Содержит в себе свойства для описания и кнопки закрытия.

#### Метод: 

* `render(data: ISaveOrderResponse)` HTMLElement: Метод для отображения данных успешного заказа. Устанавливает текст описания заказа, содержащий информацию о списанных синапсах. Возвращает шаблон успешного завершения заказа.

### Класс `Modal`
Отвечает за отображение контента в модальных окнах. Содержит в себе свойства для кнопки закрытия и контента модального окна

#### Методы и свойства: 

* `set content(value: HTMLElement)` Метод для установки контента модального окна.
* `open()` Метод для открытия модального окна.
* `close()` Метод для закрытия модального окна.
* `render(data: IModalData): HTMLElement` Метод для отображения данных в модальном окне.



## Ключевые типы данных
### PaymentMethod
Вид оплаты
```
export enum PaymentMethod {
    card = "Безналичный",
    cash = "Наличный"
}
```
