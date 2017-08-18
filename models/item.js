var mongoose = require('mongoose');

// Item Schema
var itemSchema = mongoose.Schema({
	
        "name": String,
        "price": Number,
        "brand": String,
	
        "paginationInfo": {
            "totalResults": Number,
            "resultPerPage": Number,
            "currentPage": Number,
            "pages": Number
	
			}
		});
		
		/*JSON format
		
		{
		"id": 123,
        "name": "Iphone98",
        "price": 20,
        "brand": "Apple",
  
  		"paginationInfo": {
            "totalResults": 1,
            "resultPerPage": 1,
            "currentPage": 1,
            "pages": 1
	
			}

}*/


var Item = module.exports = mongoose.model('Item', itemSchema);

//Get Item
module.exports.getItems = function(callback, limit){
	Item.find(callback).limit(limit);
}

//Add Item
module.exports.addItem = function(item, callback){
	Item.create(item,callback);
}

//Update Item
module.exports.updateItem = function(id, item, callback){
	var query = {_id: id};
	var update = {
		name: item.name,
		price: item.price,
		brand: item.brand
	}
	Item.findOneAndUpdate(query, update, item, callback);
}

//Delete Item
module.exports.removeItem = function(id, callback){
	var query = {_id: id};
	Item.remove(query, callback);
}