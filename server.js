const express = require('express');

var app = express();

app.get('/',(req, res)=>{
	//res.send({`<h1>Hello world!</h1>`});
	res.send({
		nome : "Rodrigo",
		idade : 23,
		likes: [
			'bike',
			'girls'
		]
	});
});

app.get('/about', (req, res)=>{
	res.send('About Page');
})

app.get('/bad',(req, res)=>{
	res.send({Error_message: 'Unable to fulfill the request'});
})

app.use(express.static(__dirname + '/public'));


app.listen(3000, ()=>{
	console.log('The server is up and running on port 3000');
});