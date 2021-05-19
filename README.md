# personalApi
Api server for all apps that need to store or read data. Server also contains reading weather from OpenWeatherMap server and stores it in DB.

# Used technologies:
- NodeJS
- express
- jwt (json web token)
- mysql
- sequelize

# Features
- api server (with authentication using authTokens)
- auto recreated MySQL structure (if any element missing)
- saving weather to MySQL and broadcasting it using API (saved using NodeJS server)
- creating admin user during first server start (requires user input)

# Endpoints

## Users
- GET /users
- POST /users/authenticate
- POST /users/register
- GET /users/current
- GET /users/{id}
- PUT /users/{id}
- DELETE /users/{id}

## Sensors
- GET /sensors
- POST /sensors/set
- GET /sensors/{name}
- PUT /sensors/{name}
- DELETE /sensors/{name}

## Sockets
- GET /sockets
- POST /sockets/set
- GET /sockets/{name}
- DELETE /sockets/{name}

## Weather
- GET /weather
- POST /weather/set
- GET /weather/{name}
- DELETE /weather/{name}

## Settings
- GET /settings
- POST /settings/set
- GET /settings/{name}
- DELETE /settings/{name}
