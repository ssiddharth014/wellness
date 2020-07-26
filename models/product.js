 const mongoose= require('mongoose')

 const productSchema= new mongoose.Schema({
 	name:{
 		type:String
 	},
 	id:{


 		type:String,
 		unique:true
 	},
 	totalusers:{
 		type:Number
 	},
 	newusers:{
 		type:Number
 	},
 	users:[{ip:{type:String},created:{type:Date},lastvisit:{type:Date}}]
 },{
    timestamps:true

});
 const Prod= mongoose.model('Prod',productSchema);

module.exports=Prod;