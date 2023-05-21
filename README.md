# TemanSawit-API

This API contains an API for the recording system in the TemanSawit application. It consists of three parts, namely Authentication and Authorization API, Income API, and Outcome API.

## Run Locally

Clone the project

```bash
  git clone https://github.com/TemanSawit/TemanSawit-API.git
```

Install dependencies

```bash
  npm install nodemon
```
```bash
  npm install express
```
```bash
  npm install mysql2 sequelize cors
```
```bash
  npm install jsonwebtoken bcrypt cookie-parser dotenv
```

Start the server (before that activate XAMPP in your local)

```bash
  npm start
```
## Testing API in POSTMAN

To run tests, run the following command

* Authentication and Authorization
Method Post for registration
```bash
POST http://localhost:8080/api/users
```
On body request, copy this code for example :
```bash
  {
    "username" : "JohnDoe",
    "email": "johndoe@example.com",
    "password": "pass1234",
    "confPassword": "pass1234"
  }
```

Method POST for login
```bash
POST http://localhost:8080/api/login
```
On body request, copy this code for example :
```bash
  {
    "username" : "JohnDoe",
    "password": "pass1234"
  }
```
Method GET for verify
```bash
GET http://localhost:8080/api/users
```
Method GET for refreshtoken
```bash
GET http://localhost:8080/api/token
```
