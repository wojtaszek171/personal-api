var indexRouter = require('./routes/index');
const config = require('./config');
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
require('dotenv').config();

require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_middleware/error-handler');
const weatherService = require('./routes/weather/weather.service');
const settingsService = require('./routes/settings/settings.service');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', require('./routes/users/users.controller'));
app.use('/sensors', require('./routes/sensors/sensors.controller'));
app.use('/sockets', require('./routes/sockets/sockets.controller'));
app.use('/weather', require('./routes/weather/weather.controller'));
app.use('/settings', require('./routes/settings/settings.controller'));
app.use('/lists', require('./routes/lists/list.controller'));

app.use('/cv', require('./routes/cv/cv.controller'));
app.use('/cvuser', require('./routes/cv/user/user.controller'));
app.use('/cvskills', require('./routes/cv/skill/skill.controller'));
app.use('/cvlinks', require('./routes/cv/link/link.controller'));
app.use('/cvlanguages', require('./routes/cv/language/language.controller'));

// openweathermap reading
const readWeather = async () => {
    let lat;
    let lon;

    try {
        const latRes = await settingsService.getByName('weatherLat');
        const lonRes = await settingsService.getByName('weatherLon');

        lat = latRes.value;
        lon = lonRes.value;
    } catch (e) {
        lat = '52.229676';
        lon = '21.012229';

        settingsService.set({
            name: 'weatherLat',
            value: lat
        })

        settingsService.set({
            name: 'weatherLon',
            value: lon
        })
    }

    try {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${config.weather_api}&units=metric&lang=pl`)
            .then(response => response.json())
            .then(data => {
                const { current, daily } = data;
                weatherService.set({
                    name: 'current',
                    value: current
                });
                weatherService.set({
                    name: 'daily',
                    value: daily
                });
            });


        let savedHours = [];
        const storeAfter = new Date();
        storeAfter.setDate(storeAfter.getDate()-1);
        const storeAfterTimestamp = storeAfter.getTime();

        let hourlyRes = null;

        try {
            hourlyRes = await weatherService.getByName('hourly');
            if (hourlyRes.value) {
                savedHours = hourlyRes.value.filter((hour => hour.dt*1000 > storeAfterTimestamp))
            }
        } catch (e) {
            console.log('No hourly weather');
        }

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${config.weather_api}&units=metric&lang=pl`)
            .then(response => response.json())
            .then(data => {
                data.list.forEach((hour) => {
                    const { dt, main: { temp }, weather } = hour;
                    const date = new Date(dt * 1000);
                    const icon = weather[0].icon;
                    const hourToSave = {
                        dt,
                        day: date.getDate(),
                        hour: date.getHours(),
                        temp,
                        icon
                    };
                    const dateIndex = savedHours.findIndex((savedHour) => savedHour.dt === hourToSave.dt);
                    if (dateIndex !== -1) {
                        savedHours[dateIndex] = hourToSave;
                    } else {
                        savedHours.push(hourToSave);
                    }
                })
                weatherService.set({
                    name: 'hourly',
                    value: savedHours
                });
            })
            .catch(err => {
                throw err;
            });
    } catch (e) {
        console.log(e);
    }
}

const main = () => {
    readWeather();
    setInterval(() => {
        readWeather();
    }, 900000);
}

setTimeout(main, 1000);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8393;
app.listen(port, () => console.log('Server listening on port ' + port));
