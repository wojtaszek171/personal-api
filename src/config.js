module.exports = {
    "database": {
        "host": process.env.HOST,
        "port": process.env.PORT,
        "user": process.env.USER,
        "password": process.env.PASSWORD,
        "database": process.env.HOME
    },
    "secret": process.env.SECRET,
    "weather_api": process.env.WEATHER_API
}