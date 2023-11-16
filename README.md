# Task Manager API

This API you can do:
* Get all the tasks
* Create a new tasks
* Get a tasks
* Update a tasks
* Create an user product
* Login as an user

### Tech Stack
* Typescript 
* MongoDB

### First Step
* Install all node modules packages.
```
yarn install
```
* Creates a .env file and use the .env_example file as a model.

### Running the API
```
yarn start
```

### How to use the API

* For all CRUD operations you'll need an access token. See how to get an token in User Routes.

### Tasks Routes
#### Task Model

```
{
  "name": string,
  "description": string,
  "completed": boolean
}
```

* Creates a task

Send in the request body, and the restaurant info. Use the restaurant model.

```
http://localhost:8000/api/v1/tasks
```
* Get all tasks.


Send in the request page, size, sort and name. To receive your Paginated data.

```
http://localhost:8000/api/v1/tasks?name=name&size=size&page=page&sort=sort
```
* Get a specific task

```
http://localhost:8000/api/v1/tasks/taskId
```
* Update a task

Send the restaurant data you want to update in the body of your request. Use the Restaurant model for this.
```
http://localhost:8000/api/v1/tasks/taskId
```

```

### Users Routes

#### Users Model
```
{
    "username": str,
    "email": str,
    "password": str
}
```

* Create am user

Create an user. And receive an access token to execute operations.

```
http://localhost:8000/api/v1/auth/register
```
* Login

Login in the application.

```
http://localhost:8000/api/v1/auth/login
```

```

### API Swagger 
* You can access all API routes and also test all API functionalities.
```
building
```

### Tests
* Run unit tests
```
yarn test
```

#### License

This project is under license [MIT](/LICENSE).