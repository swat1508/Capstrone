var prodCongif={

}
var devConfig={
    redisDb:{
        password:"VhQVnqm0mbJi8kbkTzIB91SrM3tbppEF",
        port:6379,
        host:(process.env.REDIS_URL || "localhost")
    },
    mongoDb: {
		url:(process.env.MONGO_URL || "mongodb://localhost:27017/feedback")
    },
    jwtSecret:"sachinkumarjain",
    rabbitmq:{
        port:5361,
        host:(process.env.REDIS_URL || "localhost")
    },
    session:{
        secretKey:"ThisIsHowYouUseRedisSessionStorage",
        name:"feedback"
    },
    facebook: {
        clientID: '223574831838603', // your App ID
        clientSecret: 'ad7395c63e89de0877138673dabb23cd', // your App Secret
        callbackURL: '/auth/facebook/callback'
    },
    google: {
        clientID: '314291804656-oi22b6fkip7ibeughj18g6qe3bpnrnb3.apps.googleusercontent.com',
        clientSecret: 'k4U5V8tS_q828sG6qdxG36jB',
        callbackURL: '/auth/google/callback'
    }
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