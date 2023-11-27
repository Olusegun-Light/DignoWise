# DignoWise: AI-Powered Symptom and Diagnosis Guidance

Welcome to **DignoWise**, your intelligent companion for understanding your health. DignoWise employs cutting-edge AI technology to provide guidance on symptoms and potential diagnoses. Whether you're a concerned individual seeking health advice or a healthcare professional looking for additional insights, DignoWise is here to assist.


## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
   - [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
4. [Project Structure](#project-structure)
5. [Dependencies](#dependencies)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

DignoWise is an AI-powered platform that leverages machine learning to analyze symptoms and provide guidance on potential health issues in individuals. This repository contains the backend code for the DignoWise application, implemented using Node.js and Express.

## Getting Started

### Prerequisites

Before running DignoWise, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Olusegun-Light/DignoWise.git
   ```

2. Install dependencies:

   ```bash
    cd DignoWise
    npm install
   ```

3. Set up environment variables:
   Create a config.env file in the root directory and add the following:

   ```bash
    NODE_ENV
    PORT
    DATABASE
    DATABASE_PASSWORD
    DATABASE_USERNAME
    JWT_SECRET
    JWT_EXPIRED_IN
    JWT_COOKIE_EXPIRES_IN
   ```

4. Run the application:

   ```bash
   npm run build
   ```
   
## Usage

### API Endpoints

DignoWise exposes the following API endpoints:

- `/api/v1/users`: User-related operations
- `/api/v1/meds`: Medical information submission

## User Routes

### Sign Up

- **Endpoint:** `/api/v1/users/signup`
- **Method:** `POST`
- **Description:** Create a new user account.
- **Request Body:**

  ```json
  {
    "email": "your.email@example.com",
    "password": "yourpassword",
    "passwordConfirm": "yourpasswordconfirmation"
  }
  ```

- **Response:**

  - Status Code: 201 (Created)
  - JSON Response:

  ```json
  {
    "status": "success",
    "token": "yourjsonwebtoken",
    "data": {
      "user": {
        "_id": "user id",
        "photo": "default.jpg",
        "email": "your.email@example.com",
        "role": "user"
      }
    }
  }
  ```

### Log In

- **Endpoint:** `/api/v1/users/login`
- **Method:** `POST`
- **Description:** Log in with an existing user account.
- **Request Body:**

  ```json
  {
    "email": "your.email@example.com",
    "password": "yourpassword"
  }
  ```

- Response:

  - Status Code: 200 (OK)
  - JSON Response:

    ```json
    {
      "status": "success",
      "token": "yourjsonwebtoken",
      "data": {
        "user": {
          "_id": "user id",
          "name": "Your Name",
          "email": "your.email@example.com",
          "role": "user"
        }
      }
    }
    ```

### Log Out

- **Endpoint**: `/api/v1/users/logout`
- **Method:** `GET`
- **Description:** Log out the currently logged-in user.
- **Response:**
  - Status Code: 200 (OK)
  - JSON Response:
    ```json
    {
      "status": "success"
    }
    ```

### Forgot Password

- **Endpoint:** `/api/v1/users/forgotPassword`
- **Method:** `POST`
- **Description:** Request a password reset email.
- **Request Body:**

  ```json
  {
    "email": "your.email@example.com"
  }
  ```

- **Response:**
- **Status Code:** 200 (OK)
- **JSON Response:**
  ```json
  {
    "status": "success",
    "message": "Token sent to email!"
  }
  ```

### Reset Password

- **Endpoint:** `/api/v1/users/resetPassword/:token`
- **Method:** `PATCH`
- **Description:** Reset the user's password with a valid reset token.
- **Request Body:**

  ```json
  {
    "password": "newpassword",
    "passwordConfirm": "newpassword"
  }
  ```

- **Response:**
- **Status Code: 200 (OK)**
- **JSON Response:**

  ```json
  {
    "status": "success",
    "token": "yourjsonwebtoken",
    "data": {
      "user": {
        "password": "new password",
        "passwordChangedAt": "Date"
      }
    }
  }
  ```

### Update Password

- **Endpoint:** `/api/v1/users/updateMyPassword`
- **Method:** `PATCH`
- **Description:** Update the currently logged-in user's password.
- **Request Body:**

  ```json
  {
    "passwordCurrent": "currentpassword",
    "password": "newpassword",
    "passwordConfirm": "newpassword"
  }
  ```

- **Response:**

  - Status Code: 200 (OK)
  - JSON Response:

    ```json
    {
      "status": "success",
      "token": "yourjsonwebtoken",
      "data": {
        "user": {
          // user data after password update
        }
      }
    }
    ```

  ```

  ```

### Get Current User

- **Endpoint:** `/api/v1/users/me`
- **Method:** `GET`
- **Description:** Get information about the currently logged-in user.
- **Response:**
  - Status Code: 200 (OK)
  - JSON Response:
    ```json
    {
      "status": "success",
      "results": 1,
      "data": {
        "data": [
          {
            "_id": "656053593006ad07f6b764c0",
            "name": "Light",
            "email": "admin@gmail.com",
            "photo": "default.jpg",
            "role": "admin"
          }
        ]
      }
    }
    ```

### Update Current User

- **Endpoint:** `/api/v1/users/updateMe`
- **Method:** `PATCH`
- **Description:** Update information about the currently logged-in user.
- **Request Body:**
- Can include fields like "name" and "email" for update.
- **Response:**
  - Status Code: 200 (OK)
  - JSON Response:
    ```json
    {
      "status": "success"
    }
    ```

### Delete Current User

- Endpoint: /api/v1/users/deleteMe
- Method: DELETE
- Description: Deactivate the currently logged-in user.
- Response:
  - Status Code: 204 (No Content)
  - JSON Response: No content in response.

### Get All Users (Admin Only)

- **Endpoint:** `/api/v1/users`
- **Method: **`GET`
- **Description:** Get a list of all users. (Admin access required)
- **Response:**
  - Status Code: 200 (OK)
  - JSON Response:
    ```json
    {
      "status": "success",
      "results": 2,
      "data": {
        "users": [
          {
            // user data
          },
          {
            // user data
          }
        ]
      }
    }
    ```

### Get User by ID (Admin Only)

- Endpoint: `/api/v1/users/:id`
- Method: `GET`
- Description: Get a user by their ID. (Admin access required)
- Response:
  - Status Code: 200 (OK)
  - JSON Response:
    ```json
    {
      "status": "success",
      "data": {
        "user": {
          // user data
        }
      }
    }
    ```

### Update User by ID (Admin Only)

- Endpoint: `/api/v1/users/:id`
- Method: `PATCH`
- Description: Update a user by their ID. (Admin access required)
- Request Body:
  - Can include fields like "name" and "email" for update.
- Response:

  - Status Code: 200 (OK)
  - JSON Response:

  ```json
  {
    "status": "success",
    "data": {
      "user": {
        // updated user data
      }
    }
  }
  ```

### Delete User by ID (Admin Only)

- Endpoint: `/api/v1/users/:id`
- Method: `DELETE`
- Description: Delete a user by their ID. (Admin access required)
- Response:
  - Status Code: 204 (No Content)
  - JSON Response: No content in response.

### Medical Information Submission Route

**Submit Medical Information**

- **Endpoint:** `/api/v1/medical-info/submit`
- **Method:** `POST`
- **Description:** Submit medical information.
- **Request Body:**

  ```json
  {
    "firstName": "Admin",
    "lastName": "Auth",
    "gender": "Male",
    "dateOfBirth": "20004-05-12",
    "bloodPressure": "Yes",
    "allergies": "Yes, Lactose intolerant",
    "smoker": "Yes"
  }
  ```

- **Response:**

  - Status Code: 201 (Created)
  - JSON Response:
    ```json
    {
      "status": "success",
      "data": {
        "medicalInfo": {
          // submitted medical information
        }
      }
    }
    ```

### Authentication

Authentication is handled using JSON Web Tokens (JWT). Make sure to include the token in the request headers when accessing protected routes.

## Project Structure

The project follows a modular structure, with key components including:

- `app.js`: Express application setup
- `controllers/`: Controllers handling business logic
- `models/`: MongoDB schema models
- `routes/`: API routes
- `utils/`: Utility functions and error handling

## Dependencies

DignoWise relies on various Node.js packages, including but not limited to:

- **Express**: Web application framework
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token for user authentication
- **Multer and Sharp**: Image upload and processing
- **Helmet**: HTTP security headers
- **Morgan**: HTTP request logger
- **Cors**: Cross-origin resource sharing middleware
- **Bcryptjs**: Password hashing
- **Dotenv**: Environment variable management
- **Express-rate-limit**: Rate limiting middleware
- **Express-mongo-sanitize**: MongoDB query injection protection
- **XSS-clean**: Cross-site scripting protection
- **HPP**: HTTP parameter pollution protection
- **Cookie-parser**: Cookie parsing middleware
- **Compression**: Response compression middleware

Check the `package.json` file for a complete list of dependencies.

## Postman Collection

You can explore and test the API endpoints using the provided Postman collection. The collection includes all the defined API routes along with example requests and responses.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/20337559/2s9YeEcXuA)

Click the "Run in Postman" button above to import the collection into your Postman workspace.

Please note that you'll need to have Postman installed on your machine to use the collection effectively.
