# Megasoft Office Backend Test

## Setup

### 1- In Your Environment

- Add .env file in the root of the project with variables similar to those in .env-example file

- Run `npm install` to install all dependencies

- Run `npm run start:dev` to start the server

#### Seed Data

- Run `npm run seed` to seed the database with some random data

### 2- Using Docker

- Install Docker and Docker Compose Link [here](https://docs.docker.com/get-docker/)

- Run `docker-compose build` to build the image

- Run `docker-compose up` to start the server

## API Documentation

### Swagger Documentation

- Swagger documentation is available at `/api-docs`

- You can see some sample requests in the swagger documentation

### Usefull Information

- After seeding the db these users will be created for testing

- Manager credentials: 
```json
{
  "email": "manager@example.com",
  "password": "password"
}
```

- Accountant credentials: 
```json
{
  "email": "accountant@gmail.com",
  "password": "password"
}

- Simple user credentials: 
```json
{
  "email": "user@example.com",
  "password": "password"
}
```