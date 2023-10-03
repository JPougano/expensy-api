# EXPENSY-API

Part of the backend side of the whole Expensy ecosystem. 
It's suposed to handle user and expenses creation and making its date easily and scalably available to other Expensy ecosystem applications.

# Technologies and Architecture

This project combines the following design patterns:

- MVC - Model View Controller
- DDD - Domain Driven Design
- Repository Pattern
- Service Pattern
- Dependency Injection
- Singleton Pattern

[**Koa**](https://koajs.com/) is an open source [express](https://expressjs.com/pt-br/) based framework, used by Expensy in order to create the application.

[**Jest**](https://jestjs.io/pt-BR/) is a framework used to run unit tests.


## Installing

```bash
git clone git@github.com:JPougano/expensy-api.git && cd ./expensy-api
docker compose up --build
```

Update .env file with your mongo instance.

## Endpoints

| Method | Route          | Description                                    |
| ------ | -------------- | ---------------------------------------------- |
| `GET`  | `/healthcheck` | Checks if the API is running                   |
| `GET`  | `/readiness`   | Checks if the API is ready to receive requests |
| `POST` | `/user`        | Creates a new user                             |
| `POST` | `/expense`     | Creates a new expense record                   |


```
expensy-api
├─ src
│  ├─ application
│  │  ├─ controller
│  │  │  ├─ maintenance.js
│  │  │  └─ user.js
│  │  ├─ router.js
│  │  └─ server.js
│  ├─ container.js
│  ├─ domain
│  │  └─ business
│  │     └─ user.js
│  └─ infrastructure
│     ├─ logger
│     │  └─ index.js
│     ├─ mongo
│     │  ├─ mongo.js
│     │  ├─ mongoose.js
│     │  └─ helpers.js
│     └─ repository
│        ├─ abstractMongoRepository.js
│        ├─ userRepository.js
│        ├─ schema
│        │  └─ userSchema.js
```
