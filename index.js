const express= require('express')


const port=7000;




const router=express.Router();

const db=require('./config/mongoose');
//const config= require('./config')




const Product = require('./models/product')

//const User= route('./models/user')


const productroute =require('./route/productRoute')
const bodyParser= require('body-parser')
const app=express();
app.use(bodyParser.json());



app.get('/product/:id',async function (req,res){
	try{
		console.log(req.connection.remoteAddress)

		const u = req.connection.remoteAddress;
		const product= await Product.findById(req.params.id1)
		if(product)
		{
            const user= await product.find({"users.ip": u})
               if(user)
                 {
                           let dateObj= new Date();
                         
                        user.lastviist=dateObj;


                        product.newuser-=1;
                        product.save()



                 }
                 else
                 {
                 	     let dateObj= new Date();
                         

                 	product.users.push({"ip":u,"created":dateObj,"lastviist":dateObj})
                 	product.totalusers+=1;
                 	product.newusers+=1;
                 	product.save()

                 }
		}
		
		

res.send({"ip":req.connection.remoteAddress,"product":product})
	}
	catch{

	}
})



app.get('/usersdetails/:id',async (req,res)=>{
	try{
var today = new Date().setHours(0, 0, 0, 0);
var first = today.getDate() - today.getDay();
var firstDayWeek = new Date(today.setDate(first));
var lastDayWeek = new Date(today.setDate(first + 6));
var firstDayMonth = new Date(today.setDate(1));
var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
lastDayWeek.setHours(23, 59, 59, 0);
lastDayMonth.setHours(23, 59, 59, 0);
today = new Date().setHours(0, 0, 0, 0);

Product.users.aggregate([{
        $match: {
            userId: decode.id
        }
    }, {
        $group: {
        	"_id": "",
            "today": {
                $push: {
                    $cond: {
                        if: {
                            $gte: ["$created", new Date(today)]
                        },
                        then: "$$ROOT",
                        else: ''
                    }
                }
            },
            "week": {
                $push: {
                    $cond: [{
                            $and: [{
                                    $gte: ["$created", new Date(firstDayWeek)]
                                },
                                {
                                    $lte: ["$created", new Date(lastDayWeek)]
                                }
                            ]
                        },
                        "$$ROOT",
                        ''
                    ]
                }
            },
            "month": {
                $push: {
                	$cond: [{
                            $and: [{
                                    $gte: ["$created", new Date(firstDayMonth)]
                                },
                                {
                                    $lte: ["$created", new Date(lastDayMonth)]
                                }
                            ]
                        },
                        "$$ROOT",
                        ''
                    ]
                }
            }
        }
    }])
    //If you want to filter in mongo query
    .forEach(function (data) {
        data.today = data.today.filter(e => e != "")
        data.week = data.week.filter(e => e != "")
        res.send({"data":data});
    })

	}
	catch(err)
	{
		res.send({"msg":err.message})
	}
})




app.get('/create',async function(req,res){
	try{
	const product= new Product({
		name:'Fitness Tools',
		id:"hjhddudu"
	});
	const newProduct =await  product.save();
console.log(product)	
console.log(newProduct)

	res.send(newProduct);
}
catch(err){
	console.log(err)
	res.send({"msg":err})
}
	
})



//app.use('/product',productroute)

app.listen(port,function(err){
	if (err)
	{
		console.log(`errror in starting server at port${port} due to ${err}`)
	}
	else{
	console.log(`server is up at running at port: ${port}`)
}
})