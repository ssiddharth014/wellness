const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/development-wellness');

const db=mongoose.connection;


db.on('error',console.error.bind(console,"error in connecting to mongodb"));






db.once('open',function(){
    console.log('connected to database :: mongodb');
});

module.exports=db;
