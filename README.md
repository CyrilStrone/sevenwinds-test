# SevenWinds_Test

### `npm i`

### `npm start`

## Тестовое задание

Требуется создать сайт по макету в фигме.
Внимательно прочитайте задание, и особенно раздел **Резюме**.
После завершения работ создайте репозиторий и отправьте ссылку вашему HR’у.
****Стек: **TypeScript, React, SASS**, а так же всё что вам понадобится (кроме **jQuery** и **node-sass**).

Будет замечательно, если вы зальёте сайт на vercel, github pages и тд, но это не обязательно.

Кодстайл: [Code style and Best Practices](https://www.notion.so/Code-style-and-Best-Practices-9d5beaa4adf14743bf34ea6bb0c213eb) 
Ссылка на API: [http://185.244.172.108:8081/](http://185.244.172.108:8081/)
Документация по API: [http://185.244.172.108:8081/swagger-ui/index.html?url=/openapi.json#/](http://185.244.172.108:8081/swagger-ui/index.html?url=/openapi.json#/)


---

## Методы API и с чем их есть

### Начало

Вам нужно создать себе общую сущность и получить её ID для дальнейшего взаимодействия с API, для этого нужен метод `/v1/outlay-rows/entity/create`.
Он вернёт вам ID, в методах API он указан как `eID`.

<aside>
💡 Внимание! Эта операция должна происходить единожды, и только на этапе написания, в дальнейшем установите этот ID как константу.

</aside>

### Получение данных

`/v1/outlay-rows/entity/{eID}/row/list`

<aside>
💡 Вы должны производить эту операцию только при входе на экран, при каких либо изменениях вам нужно актуализировать информацию локально, не запрашивая каждый раз все данные с сервера.

</aside>

### Создание строки

`/v1/outlay-rows/entity/{eID}/row/create`

Для создания строки пользователь должен нажать на иконку существующий строки.

После этого вы должны отрисовать строку в том месте, где она должна быть, заполнить все требуемые поля нулями (кроме заголовка, его оставьте пустым), включить у строки режим редактирования (третий экран в макете) и ждать пока пользователь не нажмёт `Enter` в одном из полей ввода, только после этого отправляйте данные на сервер.

<aside>
⚠️ Если в `parentId` будет передан неверный `id` - метод вернёт 404. Поэтому если у строки нет `parent` вам нужно передавать `null`.

</aside>

<aside>
💡 Обратите внимание - при изменении значений у потомков, значение родителя так же изменится, бекенд вам вернёт новое значение.

</aside>

<aside>
💡 Для создания строки нужны некоторые другие данные которые вы не отображаете, и пользователь не вводит. Заполните их нулями.

</aside>

### Обновление строки

`/v1/outlay-rows/entity/{eID}/row/{rID}/update`

Что бы начать редактировать строку нужно дважды нажать на неё мышкой. Тогда она переходит в режим редактирования.

<aside>
💡 Для обновления строки нужны некоторые другие данные которые вы не отображаете, и пользователь не вводит. Заполните их нулями.

</aside>

### Удаление строки

`/v1/outlay-rows/entity/{eID}/row/{rID}/delete`

Для удаления строки пользователь должен навестись на иконку существующий строки, как на макете там должны появиться дополнительные иконки. При клике на иконку мусорки строка удаляется.

---

## Резюме

- В самом начале создайте себе общую сущность, и используйте её ID.
- При отсутствии каких либо данных отображайте строку в режиме редактирования.
- Блокируйте создание потомков у строки, если она находится в режиме редактирования или ещё не была отправлена на сервер.
- Запрашивайте все данные с сервера только при первом входе на экран, актуализируйте данные локально.
- При каких либо взаимодействиях (создание, обновление и удаление строки) сервер будет возвращать вам массив изменённых строк, вы должны актуализировать локальные данные с помощью этих.
- Вы должны сверстать всё что есть на макете, но всё что не является таблицей - не должно иметь какого либо функционала.

## FAQ

**Можно ли использовать %moduleName%?**
Можете использовать всё что только захотите.

**Нужен ли адаптив?**
По желанию.

**Какой уровень вложенности может быть?**
Без ограничений.
