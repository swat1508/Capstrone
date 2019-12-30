const config 		= require('./config/keys'),
mongoose 	= require('mongoose');

// Connect to the database
console.log(config.mongoDb.url);
mongoose.Promise = global.Promise;
module.exports = mongoose.connect(config.mongoDb.url,{ useNewUrlParser: true ,useUnifiedTopology: true},(err)=>{
	if(err){
		console.log("mongo error",err);
		process.exit(0);
	}else{
		console.log("mongo db connected successfully");
	}
});

