const axios = require('axios'),
config=require("../config/keys");

module.exports=()=>{
    return (req, res,next) => {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        console.log(config.userApiUrl);
        if(token){
            axios.get(config.userApiUrl+'/auth/verify',{headers:{authorization:token}}).then(response => {
                console.log(response.data);
                if(response.data.role.trim()=='admin'){
                    req.username=response.data.username;
                    next();
                }else{
                    res.status(403).send({message:"You don not have suffueciant access to perform this operation."})
                }
            })
            .catch(error => {
                res.status(401).send({message:"there is some issue to verify this token."})
            });
        }else{
            req.username="Guest"
            next();
        }
    }
}