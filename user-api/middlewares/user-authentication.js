const verifyJwtToken=require("../models/user").verifyJwtToken,
config=require("../config/keys");

module.exports=()=>{
    return (req, res,next) => {
        if(req.path.indexOf("admin")> -1){
            verifyJwtToken(req,function(response){
                if(response.ok){
                    if(response.role.trim()=='admin'){
                        req.username=response.username;
                        next();
                    }else{
                        res.status(403).send({message:"You don not have suffueciant access to perform this operation."})
                    }
                }
                else{
                    res.status(401).send({message:"there is some issue to verify this token."})
                }
            });
        }
        else if(req.path.indexOf("user")> -1){
            verifyJwtToken(req,function(response){
                if(response.ok){
                    if(response.role.trim()=='user'){
                        req.username=response.username;
                        req.userId=response.id;
                        next();
                    }else{
                        res.status(403).send({message:"You don not have suffueciant access to perform this operation."})
                    }
                }
                else{
                    res.status(401).send({message:"there is some issue to verify this token."})
                }
            });
        }
        else{
            next();
        }
    }
}