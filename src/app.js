const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));
console.log(__filename);

const app = express();

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname, '../templates/partials');

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tedy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Tedy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Some random help messages',
        name: 'Tedy'
    });
});

app.get('/help/*', (req,res) => {
//    res.send('Help article is not found');
    res.render('404', {
        textMessage: 'Help article not found',
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
                error: 'You must specify an addresss',
        })
    }
    //call geocode function
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if(error){
			return res.send({error: error});
		}
		forecast( latitude, longitude , (error,response) => {
			if(error){
				return res.send({error: error});
			}
			return res.send({
				forecast: response.summary,
				location: location,
				address: req.query.address,
			});
		})
	})
		
});

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term',
        })
    }
    console.log(req.query.search);
    res.send({
        product: [ req.query.search]
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        textMessage: 'Page not found',
        name: 'Tedy'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
