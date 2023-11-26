# DogWise: AI-Powered Symptom and Diagnosis Guidance

Welcome to **DogWise**, your intelligent companion for understanding your dog's health. DogWise employs cutting-edge AI technology to provide guidance on symptoms and potential diagnoses for your furry friend. Whether you're a concerned dog parent or a veterinarian seeking additional insights, DogWise is here to assist.

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

DigWise is an AI-powered platform that leverages machine learning to analyze symptoms and provide guidance on potential health issues in dogs. This repository contains the backend code for the DogWise application, implemented using Node.js and Express.

## Getting Started

### Prerequisites

Before running DogWise, make sure you have the following installed:

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

DignoWise should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### API Endpoints

DogWise exposes the following API endpoints:

- `/api/v1/users`: User-related operations
- `/api/v1/meds`: Medical information submission

For detailed information on each endpoint, refer to the [User Routes](#user-routes) and [Medical Routes](#medical-routes) sections.

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

DogWise relies on various Node.js packages, including but not limited to:

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
