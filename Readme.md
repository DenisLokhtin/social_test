# Social-test API

Этот проект был написан как учебный. использовался Nest.js, TypeOrm и Postgresql.

**Запуск проекта**

```
git clone https://github.com/DenisLokhtin/social_test.git

cd social_test/

npm i

npm run start:dev
```

- После успешной сборки и запуска, приложение будет доступно на localhost 3003 порту.

***

**Эндпоинты:**

в приложении есть несколько эндпоинтов:

```
GET /blog/:email/profile
POST /blog/:email/profile

GET /blog/:email/posts
POST /blog/:email/posts

GET /blog/:email/subscribe
DELETE /blog/:email/subscribe
POST /blog/:email/subscribe

```

***

- **GET /blog/:email/profile**

Возвращает объект пользователя:

```
{
    "id": 2,
    "first_name": "john",
    "last_name": "doe",
    "email": "2@mail.ru"
}
```

***

- **GET /blog/:email/posts**

Возвращает список объектов 20 последних постов пользователя и его подписок:

```
[
    {
        "id": 75,
        "createDateTime": "2022-11-25T07:56:21.240Z",
        "description": "post",
        "profileId": 2
    },
    {
        "id": 74,
        "createDateTime": "2022-11-25T07:56:20.048Z",
        "description": "post",
        "profileId": 2
    },
]
```

***

- **GET /blog/:email/subscribe**

Возвращает список объектов с id пользователя и id его подписки.

```
[
    {
        "id": 10,
        "profileId": 2,
        "subscriptionId": 3
    },
    {
        "id": 11,
        "profileId": 2,
        "subscriptionId": 4
    }
]
```

***

**Также все Get /posts может принимать один query параметр:**

- datetime=date (Дата в формате ISO).

**Пример использования:**

```
http://localhost:3003/blog/2@mail.ru/posts?datetime=2022-11-25T07:56:21.240Z
```

***

- **POST /blog/:email/profile**

Служит для изменения имени и фамилии юзера

Тело запроса:

```
{
	"first_name": string,
	"last_name": string,
	
}
```

- **POST /blog/:email/posts**

Тело запроса:

```
{
	"description": string,
}
```

- **POST /blog/:email/subscribe**

Тело запроса:

```
{
	"profileId": number,
}
```

***

- **DELETE /blog/:email/subscribe**

**Очищает подписки пользователя**

***
