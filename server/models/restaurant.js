const mongoose = require('mongoose');



const restaurantSchema= new mongoose.Schema({
    restaurantId: { type: String},
    name: { type: String, required: true },
  

});

module.exports =  restaurantSchema