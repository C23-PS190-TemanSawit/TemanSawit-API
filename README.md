# Cloud Computing Path

Creating RESTful APIs and deploying to Google Cloud Platform using [Google Cloud Run](https//cloud.google.com/run) and [Google Cloud Build](https//cloud.google.com/build) for communication between Machine Learning Model and Mobile Development. Creating database in [Google Compute Engine](https://cloud.google.com/compute) and using [Google Cloud Storage](https//cloud.google.com/storage) to store images.

The CC division consists of:

- Muh. Falach Achsan Yusuf (C300DSX2627)
- Rischa Nurul Hidayati (C177DSY2224)

## TemanSawit-API

<!-- Test -->

TemanSawit-API is a RESTful API that provides various functions to manage and process data related to oil palm plantations. This API is deployed on Google Cloud Platform (GCP). In making the RESTful APIs we use [NodeJS](https//nodejs.org/en/) with some other dependencies which are [Sequelize](https//sequelize.org), [ExpressJS](https//expressjs.com), JSON Web Token [JWT](https://jwt.io/), and [CORS](https//enable-cors.org/index.html).

The API consists of four main endpoints that provide different functions:

1. Authentication/Authorization API
2. Income API
3. Outcome API
4. [Ripeness Model API](https://github.com/TemanSawit/TemanSawit-ml-api)

Overall, TemanSawit-API provides a comprehensive and efficient solution for managing and processing data related to oil palm plantations.

## 1. Authentication/Authorization API

These endpoints allow users to authenticate themselves and obtain authorization to access other endpoints. The API implements token-based authentication using JSON Web Tokens (JWT) to ensure secure communication between the client and server.

**Base URL:**
https://temansawit-api-sqmlxtcfma-ts.a.run.app

**Method:**

> GET

- **Show list All Users**

```bash
GET {{Host}}/api/users
```

**Response:**

```JSON
    {
        "userId": 1,
        "username": "admin",
        "email": "example@tes.com"
    }
```

This method is to get all registered users.

- **Show Refresh Token**

```bash
GET {{Host}}/api/token
```

- **Request Header:**

  | Key           | Value                                                 |
  | ------------- | ----------------------------------------------------- |
  | Authorization | "Use refresh_token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "accessToken": "accessToken"
}
```

This method is to get a refresh token from the admin which the user uses to log back in.

How to use : 
Send a refresh token to headers ('authorization') and then click send request. If successful, the response displayed is a refresh token which can be used to update the access token when the user wants to log in.

- **Show User Profile**

```bash
GET {{Host}}/api/profile
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "userId": 1,
    "username": "admin",
    "fullName": null,
    "email": "example@tes.com",
    "image": null,
    "phoneNumber": null,
    "birthDate": null,
    "gender": null
}
```

This method is to get the user profile.

How to use :
Enter the request above then send. If successful, the response displayed is in the form of information contained in the logged-in user profile.

**Method:**

> POST

- **Register**

```bash
POST {{Host}}/api/users
```

On body request, copy this code for example :

```bash
  {
    "username": "admin",
    "email": "example@tes.com",
    "password": "123456",
    "confPassword": "123456"
  }
```

**Response:**

```JSON
{
    "status": "success",
    "message": "Registrasi berhasil"
}
```

This method is for registers.

How to use :
Enter the request above and complete the body header as in the example then send. If successful it will display the message "Registrasi berhasil". If the user does not register first then the user cannot login.

- **Login**

```bash
POST {{Host}}/api/login
```

On body request, copy this code for example :

```bash
  {
    "username" : "admin",
    "password" : "123456"
  }
```

**Response:**

```JSON
{
    "accessToken": "accessToken",
    "refreshToken": "refreshToken",
    "userId": 1,
    "name": "admin",
    "email": "example@tes.com"
}
```

This method is for login.

How to use :
Enter the request above and complete the body header as in the example then send. If successful it will display the logged-in user, access token, refresh token, and userId.

- **Adding Image to GCS Bucket**

```bash
POST {{Host}}/api/upload
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

- **Body form-data:**

  | File            | Value                                                                                                        |
  | --------------- | ------------------------------------------------------------------------------------------------------------ |
  | Download sample | https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg |

**Response:**

```JSON
{
    "status": "success",
    "message": "File berhasil diupload pexels-pixabay-220453.jpg",
    "url": "publicURL"
}
```

This method is for adding a user profile picture and will be stored in the GCS Bucket.

How to use :
Enter the request above and complete the request header as in the example then send. If successful it will display the message public URL of the image. Every time a user uploads a new image, the URL will be updated.

**Method:**

> PUT

- **Update Password**

```bash
PUT {{Host}}/api/update
```

On body request, copy this code for example :

```bash
  {
    "password":"123456",
    "newPassword":"1234567",
    "confPassword":"1234567"
  }
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Update password berhasil"
}
```

This method is for updating the password by the user.

How to use :
Enter the request above and complete the request header and body as in the example then send. If successful it will display a successful message. This function was created so that users can increase the security of their accounts.

- **Forgot Password**

```bash
PUT {{Host}}/api/forgotPassword
```

On body request, copy this code for example :

```bash
  {
    "username":"admin",
    "newPassword":"1234567",
    "confPassword":"1234567"
  }
```

**Response:**

```JSON
{
    "status": "success",
    "message": "Update password berhasil"
}
```

This method is for updating passwords due to forgetting.

How to use :
Enter the request above and complete the request header and body as in the example then send. If successful it will display a successful message. This function is almost similar to the update password function, but this function is used when the user chooses to forget the password. So it will redirect to this function.

- **Update Profile**

```bash
PUT {{Host}}/api/profile
```

On body request, copy this code for example :

```bash
  {
    "fullName" : "Admin Test API",
    "phoneNumber" : "08123456789",
    "birthDate" : "YY-MM-DD",
    "gender": "Laki-Laki"
  }
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Update profile berhasil"
}
```

This method is to update the user profile.

How to use :
Enter the request above and complete the request body as in the example then send. If successful it will display a successful message. This function is used when the user wants to update their profile or complete their profile because when registering the default settings are that the user is only asked to enter a name, username, email, and password.

**Method:**

> DELETE

- **Logout**

```bash
DELETE {{Host}}/api/logout
```

**Response:**

```JSON
{
    "status": "success",
    "message": "Logout berhasil"
}
```

- **Request Header:**

  | Key           | Value                                                 |
  | ------------- | ----------------------------------------------------- |
  | Authorization | "Use refresh_token For Authtentication/Authorization" |

This method is to log out of the user account.

How to use :
Send a refresh token to headers ('authorization') and then click send request. If successful it will display a successful message. This function is used when the user wants to leave his account.

## 2. User Income API

This endpoint provides functions to manage revenue data related to oil palm plantations. Users can retrieve, create, update and delete revenue data using this endpoint. The API stores revenue data in a [Compute Engine](https://cloud.google.com/compute) instance for data processing and cutting expenses.

**Base URL:**
tbc

**Method:**

> POST

- **Create Income**

```bash
POST {{Host}}/api/income
```

On body request, copy this code for example :

```bash
  {
    "userId": 1,
    "transaction_time": "YY-MM-DD",
    "price": "150000",
    "total_weight": "10",
    "description": "Admin example"
  }
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Berhasil menambah transaksi"
}
```

This method is to add income to the record.

How to use :
Enter the request above and complete the request header and body as in the example then send. If successful it will display a successful message. This function is used when the user wants to record his income and only logged-in users can use this method.

**Method:**

> GET

- **Show List All Users Income**

```bash
GET {{Host}}/api/income
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
[
    {
        "incomeId": 1,
        "transaction_time": "2023-04-01",
        "price": 150000,
        "total_weight": 10,
        "description": "Admin example",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "userId": 1,
        "user": {
            "userId": 1,
            "username": "admin",
            "email": "example@tes.com",
            "fullName": null,
            "password": "hashPassword",
            "refresh_token": "refreshToken",
            "image": "publicURL",
            "phoneNumber": null,
            "birthDate": null,
            "gender": null,
            "createdAt": "datetime",
            "updatedAt": "datetime"
        }
    }
]
```

This method is to get all the income that the user has.

How to use :
Enter the request above and complete the request header as in the example then send. If successful it will display a successful message. This function is used when you want to see all recorded income.

- **Show List Incomes by ID**

```bash
GET {{Host}}/api/income/:incomeId
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
[
    {
        "incomeId": 1,
        "transaction_time": "2023-04-01",
        "price": 150000,
        "total_weight": 10,
        "description": "Admin Example",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "userId": 1,
        "user": {
            "userId": 1
        }
    }
]
```

This method is to get all income based on id.

How to use :
Enter the request above and complete the request header as in the example then send. If successful it will display a successful message. This function is used when you want to see all income based on a certain id.

- **Sort Incomes by Time Creation**

```bash
GET {{Host}}/api/income/sort
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "incomeId": 1,
    "transaction_time": "2023-04-01",
    "price": 150000,
    "total_weight": 10,
    "description": "Admin example",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "userId": 1
}
```

This method is to sort income based on the time it was made.

How to use :
Enter the request above and complete the request header as in the example then send. If successful, it will display the order of income based on the latest time it was made to the oldest.

**Method:**

> PUT

- **Update Income Transactions**

```bash
PUT {{Host}}/api/income/update/:incomeId
```

On body request, copy this code for example :

```bash
  {
    "transaction_time":"YY-MM-DD",
    "price": 20000,
    "total_weight":25,
    "description":"Admin Update Example"
  }
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Transaksi berhasil diperbarui"
}
```

This method is for updating transactions that have been made using incomeId.

How to use :
Enter the request above and complete the request header and body as in the example then send. If successful it will display a successful message. This function is used when the user wants to update a transaction he made before when an error occurs so he doesn't need to make a new transaction.

**Method:**

> DELETE

- **Delete Income Transaction**

```bash
DELETE {{Host}}/api/income/incomeId
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Transaksi berhasil dihapus"
}
```

This method is to delete income transactions.

How to use :
Enter the request above then send. If successful it will display a successful message. This function is to delete income transactions that have been made by the user.

## 3. User Outcome API

This endpoint provides functionalities for managing outcome data related to oil palm plantation. Users can retrieve, create, update, and delete outcome data using this endpoint. The API stores the outcome data in a [Compute Engine](https://cloud.google.com/compute) instance for data processing and cutting expenses.

**Base URL:**
tbc

**Method:**

> POST

- **Create Outcome**

```bash
POST {{Host}}/api/outcome
```

On body request, copy this code for example :

```bash
  {
   "transaction_time": "YY-MM-DD",
    "total_outcome": "50",
    "description": "Admin Example"
  }
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Berhasil menambah transaksi"
}
```

This method is to add outcome to the record.

How to use :
Enter the request above and complete the request header and body as in the example then send. If successful it will display a successful message. This function is used when the user wants to record his outcome and only logged-in users can use this method.

**Method:**

> GET

- **Show List All Users Outcome**

```bash
GET {{Host}}/api/outcome
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

```JSON
[
    {
        "outcomeId": 1,
        "transaction_time": "2023-04-01",
        "total_outcome": 50,
        "description": "Admin example",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "userId": 1,
        "user": {
            "userId": 1,
            "username": "admin",
            "email": "example@tes.com",
            "fullName": null,
            "password": "hashPassword",
            "refresh_token": "refreshToken",
            "image": "publicURL",
            "phoneNumber": null,
            "birthDate": null,
            "gender": null,
            "createdAt": "datetime",
            "updatedAt": "datetime"
        }
    }
]
```

This method is to get all the outcome that the user has.

How to use :
Enter the request above and complete the request header as in the example then send. If successful it will display a successful message. This function is used when you want to see all recorded outcome.

- **Show List Outcomes by ID**

```bash
GET {{Host}}/api/outcome/:outcomeId
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
[
    {
        "outcomeId": 1,
        "transaction_time": "2023-04-01",
        "total_outcome": 50,
        "description": "Admin Example",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "userId": 1,
        "user": {
            "userId": 1
        }
    }
]
```

This method is to get all outcome based on id.

How to use :
Enter the request above and complete the request header as in the example then send. If successful it will display a successful message. This function is used when you want to see all outcome based on a certain id.

- **Sort Outcomes by Time Creation**

```bash
GET {{Host}}/api/outcome/sort
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "outcomeId": 1,
    "transaction_time": "2023-04-01",
    "total_weight": 50,
    "description": "Admin example",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "userId": 1
}
```

This method is to sort outcome based on the time it was made.

How to use :
Enter the request above and complete the request header as in the example then send. If successful, it will display the order of outcome based on the latest time it was made to the oldest.

**Method:**

> PUT

- **Update Outcome Transactions**

```bash
PUT {{Host}}/api/outcome/update/:outcomeId
```

On body request, copy this code for example :

```bash
  {
    "transaction_time": "YY-MM-DD",
    "total_outcome": "20",
    "description": "Admin Update Example"
  }
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Transaksi berhasil diperbarui"
}
```

This method is for updating transactions that have been made using outcomeId.

How to use :
Enter the request above and complete the request header and body as in the example then send. If successful it will display a successful message. This function is used when the user wants to update a transaction he made before when an error occurs so he doesn't need to make a new transaction.

**Method:**

> DELETE

- **Delete Outcome Transaction**

```bash
DELETE {{Host}}/api/outcome/outcomeId
```

- **Request Header:**

  | Key           | Value                                         |
  | ------------- | --------------------------------------------- |
  | Authorization | "Use Token For Authtentication/Authorization" |

**Response:**

```JSON
{
    "status": "success",
    "message": "Transaksi berhasil dihapus"
}
```

This method is to delete outcome transactions.

How to use :
Enter the request above then send. If successful it will display a successful message. This function is to delete outcome transactions that have been made by the user.
