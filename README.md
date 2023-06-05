# TemanSawit-API

TemanSawit-API is a RESTful API that provides various functions to manage and process data related to oil palm plantations. This API is deployed on Google Cloud Platform (GCP) using [Google Cloud Run](https//cloud.google.com/run), [Google Cloud Build](https//cloud.google.com/build), [Google Cloud Storage](https//cloud.google.com/storage), and [Google Compute Engine](https://cloud.google.com/compute). 

The API consists of four main endpoints that provide different functions:
1. Authentication/Authorization API
2. Income API
3. Outcome API
4. Ripeness Model API

Overall, TemanSawit-API provides a comprehensive and efficient solution for managing and processing data related to oil palm plantations.

## Authentication/Authorization API

These endpoints allow users to authenticate themselves and obtain authorization to access other endpoints. The API implements token-based authentication using JSON Web Tokens (JWT) to ensure secure communication between the client and server.

Method GET for verify
```bash
GET http://localhost:8080/api/users
```
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
Method GET for refreshtoken
```bash
GET http://localhost:8080/api/token
```
