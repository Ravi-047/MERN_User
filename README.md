# DIGI USERS

This project is to display the list of users and perform a CRUD operation on it.
It implements an API server to fetch the Users from a MongoDB database. It also provides endpoints to retrieve the stored users in a paginated response and search for users based on username, namme, state, and also have sorting functionality based on field.

Deployed frontend link - [Click Here](https://64be040aee38681f6c26c7e6--astonishing-pegasus-7856c9.netlify.app/)

Deployed backend link - [Cick Here](https://zany-pear-mussel-tux.cyclic.app)

## Table of Contents

- ### [Frontend](#frontend)

- ### [Backend](#backend)

## Frontend

- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Demo](#demo)
- [Features](#features)

## Requirements

To run this project, you need the following dependencies:

- Node.js (v14 or higher)
- MongoDB (running on localhost or accessible URL)
- React App.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/MERN_User.git
   cd MERN_User
   cd frontend
   ```

2. Install the dependencies:

   ```terminal
   npm install
   ```

## Usage

### Running the Server

To start the server, run the following command:

```bash
npm start or npm run start
```

The server will start running on port 3000 by default. You can access it at <http://localhost:3000>.

### API Endpoints

- #### Fetch Users

        Endpoint: http://localhost:3000

        Description: Fetches the users stored from the database and display it in table form with search, sort and paginated functionality.

        You can also update and delete the user if you are an authorized user.

- #### Register Users

        Endpoint: http://localhost:3000/register

        Description: Display the form where users can filled the necessary details and submit the form

- #### Login Users

        Endpoint: http://localhost:3000/login

        Description: Allow the user to login with email and password.
        You can also login as Admin to use full features.

## Demo

### You can view a live demo of app [here](https://64be040aee38681f6c26c7e6--astonishing-pegasus-7856c9.netlify.app/)

## Features

- Able to register user with propper validation check.
- Able to login with both user and admin.
- Able to see all the user and also update and delete the user if authenticated.
- Search by username, name, email, and state.
- Sort by fileds name in ascending order and descending order.
- Proper Pagination.

---

## Backend

- [DIGI USERS](#digi-users)
  - [Table of Contents](#table-of-contents)
  - [Frontend](#frontend)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Usage](#usage)
    - [Running the Server](#running-the-server)
    - [API Endpoints](#api-endpoints)
  - [Demo](#demo)
    - [You can view a live demo of app here](#you-can-view-a-live-demo-of-app-here)
  - [Features](#features)
  - [Backend](#backend)
  - [Requirement](#requirement)
  - [Backend Setup](#backend-setup)
  - [Backend Usage](#backend-usage)
    - [Running the Backend Server](#running-the-backend-server)
    - [Backend API Endpoints](#backend-api-endpoints)
  - [Backend Demo](#backend-demo)
  - [Conclusion](#conclusion)

## Requirement

To run this project, you need the following dependencies:

- Node.js (v14 or higher)
- MongoDB (running on localhost or accessible URL)
- Post Man (to check api endpoint)

## Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/repository.git
   cd folder name
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory with the following content:

   ```bash
   PORT = 8080
   MONGODB_URI = Your MongoDB URL
   JWT_SECRETKEY = YOUR_SECRET_KEY
   ```

## Backend Usage

### Running the Backend Server

To start the server, run the following command:

```bash
npm run server
```

The server will start running on port 8080 by default. You can access it at <http://localhost:8080>.

### Backend API Endpoints

- #### Fetch Latest users

        Endpoint: GET /users

        Description: Fetches the latest users in array of object format.

        http://localhost:8080/users

```json
"users":[
    {
        "_id": "64bd9ae3092a5ac793f9fe0b",
        "username": "golu",
        "email": "golu@gmail.com",
        "phone": "7485961234",
        "password": "Gou@1999",
        "name": "Golu Kumar",
        "age": 45,
        "state": "Bihar",
        "isAdmin": false,
        "createdAt": "2023-07-23T21:25:55.373Z",
        "__v": 0
    }
]
```

- #### For Adding user

        Endpoint: POST /users

        Description:-
        - Able to add the user with all the necessary detial.
        - Checking all the input fields with propper validation using middleware.
        - email check, phone number ange age check.


        http://localhost:8080/users

- #### For Login user

        Endpoint: POST /users/login

        Description:-
        - Able to login user with email and password
        - Able to login as admin to user full feature.
        - To login the TOKEN is required in headers for authentication
        - Implementing JWT token authentication.

        http://localhost:8080/users/login
        token is required.

- #### For search, sorting, and pagination

        Search :  - GET /users?search=ravi (usrname)
                  - GET /users?search=bihar (state)
                  - GET /users?search=ravi@gmail.com (email)
                  - GET /users?search=ravi ranjan (Name)

        sort :    - GET /users?sortFied=name&sortOrder=desc
                  - GET /users?sortFied=username&sortOrder=asc
                  - you can sort in with all fields.

        paginations : - GET /users?page=1&limit=10

        you can use all the  endpoints at a time.

        GET /users?page=1&limit=10&search=bihar&sortField=state&sortOrder=desc

## Backend Demo

You can view a live demo of the backend [here](https://zany-pear-mussel-tux.cyclic.app/users)

## Conclusion

Please make sure to replace the placeholders. with actual values specific to project. Additionally, customize the sections according to your project's structure and requirements.

In this `README.md` file, we provide details about the project, its requirements, setup instructions, usage guide, API endpoints, contributing guidelines, and license information. A well-maintained `README.md` file helps users and contributors understand the project better and get started quickly
