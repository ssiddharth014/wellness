const express= require('express')
//const User= require('../models/userModel')

const productModel = require('../models/product')



const router = express.Router();





router.get('/creatProduct',async (req,res)=>{
	
try{


	const product= new Product({
		name:'Fitness Tools',
		id:"12hgte622dsdw"
	});
	const newProduct = await product.save();
	res.send(newProduct);

}
catch(err){
	res.send({msg: err,"status":500})
}


	

})



module.exports= router;