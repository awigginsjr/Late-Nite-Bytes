const mongoose = require('mongoose');



const restaurantSchema= new mongoose.Schema({
    restaurantId: { type: String},
    name: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    rating: { type: String, required: true },
    open: { type: Boolean, required: true },
    address: {type: String, required: true },
    

});

module.exports =  restaurantSchema