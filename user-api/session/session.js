const session= require('express-session'),
 redis=require("redis"),
 redisStore = require('connect-redis')(session),
 config = require('../config/keys');
 //session store intialization with radis store
console.log("redis url",config.redisDb.host)
const redisClient = redis.createClient({
    host:  config.redisDb.host,
    port: config.redisDb.port
});
redisClient.on('ready',function() {
    console.log("Redis is ready");
});  
redisClient.on('error',function() {
    console.log("Error in Redis");
});
if(process.env.ENVIROMENT==="production"){//locally we dont need it
        redisClient.AUTH(config.redisDb.password);
}
// export session
module.exports=session({
    secret: config.session.secretKey,
    name: config.session.name ,
    resave: false,
    saveUninitialized: false,
	unset: 'destroy',
    store: new redisStore({
        host: config.redisDb.host,
        port: config.redisDb.port,
        client: redisClient,
        ttl: 86400
    })
})