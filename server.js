const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>
	{
		return new Date().getFullYear();
	});

hbs.registerHelper('scream_it', (message) => 
	{
		return message.toUpperCase();
	});

//Middle Where
//Maintensnce
/*app.use((req, res, next) =>
	{
		res.render('maintenance.hbs',
			{
				message : "Will be back soon"
			});

	});*/

app.use((request, response, next) => 
	{
		var now = new Date().toString();
		var log = `${now} : ${request.method} ${request.url}`;
		
		fs.appendFile('server.log', log + '\n', 
			(err) => 
				{
					console.log(err ? "Unable to append to server.log" : log);
				}
		);
		next();
	});

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>
	{
		res.render('home.hbs',
			{
				pageTitle : 'Home Page',
				welcomeMessage : 'Hi is good to see you!'
			});
	});

app.get('/bad',(req, res)=>
	{
		res.send({Error_message: 'Unable to fulfill the request.'});
	})

app.get('/about',(req, res)=>
	{
		res.render('about.hbs',
			{
				pageTitle : 'About Page'
			});
	});

app.listen(3000, ()=>
	{
		console.log('The server is up and running on port 3000');
	});