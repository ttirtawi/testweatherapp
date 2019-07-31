const request = require('request');

const forecast = (latitude, longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/faaf052b96ec95d86d6735d239f1b8e7/'+ latitude +','+ longitude + '?units=si ';
    request( {url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to service', undefined);
        } else if (body.error){
            callback('Unable to get forecast, please check other location', undefined);
        } else{
            callback(undefined, {
                summary: body.daily.summary
            })
        }
    })

}

module.exports = forecast;
