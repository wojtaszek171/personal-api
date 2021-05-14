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
- /users
- /sensors
- /sockets
- /weather
- /settings
