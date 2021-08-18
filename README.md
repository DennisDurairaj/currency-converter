# currency-converter

## Installation and setup

Starting in the root folder, install the dependencies for the project.

```
npm install
```

This script installs all the dependencies for the client and server so you don't have to run `npm install` for each service separately.

### Setting env variables
Normally env variables such as api keys and basic auth credentials are stored in secrets within continuous integration platforms.

Since I haven't implemented continuous integration in this project, we need to update the env variables in the server.

Open `./server/.env` and in the following code replace `YOUR_XE_USERNAME` and `YOUR_XE_PASSWORD` with your credentials to access the XE API.

```
xeuser=YOUR_XE_USERNAME
xepassword=YOUR_XE_PASSWORD
```

## Running the application

There are two ways to run the application in your local environment.
- Using Docker
- Using `webpack-dev-server` in `react-scripts` and local server for backend

### Using Docker

Make sure you have [Docker](https://www.docker.com/get-started) installed.

From the root directory run 
```
docker-compose up -d
```
This will build the docker images based on the configurations in the `docker-compose.yaml` file.

Navigate to `localhost:3000` to access the application. Note that the application runs in production mode when run using this method.

### Using regular `npm` scripts

From the root directory run
```
npm start
```
This starts up the dev servers for both the client and the server using `npm-run-all` and automatically opens up the application in your default browser. (Does not support IE)

## Swagger API Docs

Accessible at the URL http://localhost:6060/api-docs/ once the application is running.
