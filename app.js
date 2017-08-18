var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Item = require('./models/item');

//connect to Mongoose
mongoose.connect('mongodb://localhost/phoneshop');
var db = mongoose.connection;

//home route 
app.get('/', function(req, res){
	res.send('Hello world');
});

//read request
app.get('/item',function(req, res){
	Item.getItems(function(err, items){
		if(err){
			throw err;
		}
		res.json(items);
	})
});

//post request
app.post('/item',function(req, res){
	var item = req.body;
	Item.addItem(item, function(err, items){
		if(err){
			throw err;
		}
		res.json(items);
	})
});


//update request
app.put('/item/:_id',function(req, res){
	var id = req.params._id;
	var item = req.body;
	Item.updateItem(id, item,function(err, items){
		if(err){
			throw err;
		}
		res.json(items);
	})
});



app.delete('/item/:_id',function(req, res){
	var id = req.params._id;
	Item.removeItem(id, function(err,item){
		if(err){
			throw err;
		}
		res.json(item);
	});
	
});


app.listen(3000);
console.log('listening on port 3000');