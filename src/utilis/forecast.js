const request = require('request')

const forecast = (latitude, longitude, callback) => {
     const url = 'https://api.darksky.net/forecast/a11a6d392dab83c37667b6ff042a9054/' + longitude + ',' + latitude + '?units=si'
     
     request({ url: url, json: true },(error, {body}) => {
            if (error){
            callback('Unable to connect to weather service!',undefined)
            } else if (body.error) {
                callback('Unable to find location.', undefined)
                } else  {
                    callback(undefined, {
                        temp: Math.round(body.currently.temperature),
                        summary:body.daily.data[0].summary,
                        high: Math.round(body.daily.data[0].temperatureHigh),
                        low:Math.round(body.daily.data[0].temperatureLow)
                })
                
            }
        })
    }
  

    module.exports = forecast

    // body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.' + ' The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '.' + ' There is a ' + body.currently.precipProbability + '% chance of rain.') 