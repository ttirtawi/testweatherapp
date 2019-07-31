const request = require('request');

//to search the lat long
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=1&access_token=pk.eyJ1IjoidHRpcnRhd2kiLCJhIjoiY2p5bWQ1eGRjMGh5dDNjdDg2cG91NjlhNyJ9.NkEtdpHkKghAzsa3MiL8DA';
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        } 
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            } )
        }
    })
}

module.exports = geocode
