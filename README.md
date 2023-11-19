# Bookstore CRUD Application

This repository contains a CRUD (Create, Read, Update, Delete) application for a bookstore, built using React, Quarkus, MongoDB, and Keycloak for security.

## Overview

The Bookstore CRUD application provides a user-friendly interface to perform basic operations on a bookstore inventory. Users can add, view, edit, and delete books from the database.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Quarkus**: Java framework for building lightweight, container-first, and reactive applications.
- **MongoDB**: NoSQL database used to store bookstore data.
- **Keycloak**: Open-source identity and access management for securing the application.

## Features

- **User Authentication**: Keycloak integration ensures secure access to the application with user authentication and authorization.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on the bookstore inventory.
- **React Frontend**: Intuitive and responsive user interface built with React for seamless interaction.

## Setup Instructions

To run the application locally, follow these steps:

1. **Clone the Repository**:
~~~
git clone https://github.com/yourusername/bookstore-crud.git
~~~

2. **MongoDB Setup**
- On the root directory of the project, execute the docker compose up command
~~~
docker compose up
~~~

2. **Backend Setup**:
- Ensure you have Java 17+ and Maven 3.2+ installed.
- Navigate to the `backend` directory.
- Configure MongoDB connection details in `application.properties`. For default, it is configured with the docker compose yaml settings
- Run Quarkus application:
~~~
./mvnw compile quarkus:dev
~~~

3. **Frontend Setup**:
- Navigate to the `frontend` directory.
- Install dependencies:
~~~
npm install
~~~

- Start the React application:
~~~
npm start
~~~

4. **Keycloak Setup**:
- Install and set up Keycloak 22 server to run in port 8081.
- Import the realm-export.json into Keycloak
- Update Keycloak configurations in the application accordingly if necessary.

5. **Access the Application**:
- Open your browser and go to `http://localhost:3000` to access the Bookstore CRUD application.

## Contributing

Contributions are welcome! If you want to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to the developers and communities behind React, Quarkus, MongoDB, and Keycloak for their incredible tools and resources that made this project possible.
