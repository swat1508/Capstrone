const prodCongif={
    
},
devConfig={
    redisDb:{
        port:6379,
        host:(process.env.REDIS_URL || "localhost")
    },
    mongoDb: {
		url:(process.env.MONGO_URL || "mongodb://localhost:27017/feedback")
    },
    session:{
        secretKey:"ThisIsHowYouUseRedisSessionStorage",
        name:"ChatBot"
    },
    userApiUrl:process.env.HOST||"http://localhost:3000"
}
function init(){
    if(process.env.ENVIROMENT==="production"){//
        return prodCongif;
    }
    else{
        return devConfig;
    }
}
module.exports = init();