const passport 	= require('passport'),
express= require('express'),
authRouter = express.Router(),
userRouter=express.Router(),
adminRouter=express.Router(),
User = require('../models/user'),
fileUploader=require('../middlewares/file-upload');

// Register
authRouter.post('/register', fileUploader.single('userimage'),function(req, res, next) {
    const {username,password,role,displayName} =req.body;
    console.log(req.file);
    const userImage=req.file?req.file.path:"";
    if(username && password){
    // Check if the username already exists for non-social account
        User.findOne({'username': new RegExp('^' + username + '$', 'i'), 'socialId': null}, function(err, user){
            if(err) throw err;
            if(user){
                res.status(409).json({message: 'User allredy exist please login..'}).redirect("/register"); 
            }else{
                User.create({username,password,role,displayName,userImage} , function(err, newUser){
                    if(err) throw err;
                    res.json({msg: "ragistered success fully please login in application"})
                });
            }
        });
    }else{
        res.status(401).json({errer:"Please provide valid email and password"});
    }
});
// verify Token
authRouter.get("/verify",function(req,res){
    User.verifyJwtToken(req,function(verifiedData){
        if(verifiedData && verifiedData.ok){
            res.json(verifiedData);
        }else{
            res.status(verifiedData.status).send({message:verifiedData.message})
        }
    })
});
//create token
authRouter.get("/createtoken",function(req,res){
    User.createJwtToken(req.body,function(token){
        res.json({token});
    })
})
// local login Authentication routes
authRouter.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        User.createJwtToken(req.user,function(token){
            console.log(token);
            res.json({token,role:req.user.role});
        });
});
// Social Authentication routes
// 1. Login via Facebook
authRouter.get('/facebook', passport.authenticate('facebook', { scope : ['email'] }));
authRouter.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}),function(req, res) {
    User.createJwtToken(req.user,function(token){
        res.json({token,role:req.user.role});
    });
});

// 2. Login via Google
authRouter.get('/google', passport.authenticate('google',{ scope:['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
    User.createJwtToken(req.user,function(token){
        console.log(req.user);
        res.json({token,role:req.user.role});
    });
});
// logout
authRouter.get('/logout', function(req, res, next) {
    console.log("logged out successfully")
    req.logout();
    req.session = null;
    res.redirect("/login");
});

// get currentUser
userRouter.get("/currentuser",function(req,res){
    res.json({user:req.user});
});
// get address
userRouter.get("/addresses",function(req,res){
    User.findById(req.userId,function(err,userData){
        if(err) throw err;
        if(userData.addresses){
            res.json(userData.addresses);
        }else{
            res.status(404).send({message:"user not have any address avilable"})
        }
    })
});
userRouter.put("/giveadminaccess/:userId",function(req,res){
        User.updateUser(req.params.userId,{role:"admin"},function(err,newUser){
            if(err) throw err;
            res.json(newUser);
        })
});
userRouter.post("/create/address",function(req,res){
    User.createAndUpdateAddress(req.userId,req.body,function(err,userData){
        if(err) throw err;
        if(userData.addresses){
            res.json(userData.addresses);
        }
    })
});

userRouter.delete("/delete/address/:addressId",function(req,res){
    User.deleteAddress(req.userId,req.params.addressId,function(err,userData){
        if(err){
            res.status(500).send({message : 'error in deleting address'});
        }
        else{
            res.json(userData.addresses);
        }
    })
});
userRouter.put("/update/address/:addressId",function(req,res){
    User.updateAddress(req.userId,req.params.addressId,req.body,function(err,userData){
        if(err){
            res.status(500).send({message : 'error in updated address'});
        }
        else{
            res.json(userData.addresses);
        }
    })
});
// get all user
adminRouter.get("/users",function(req,res){
    User.find({},function(err,users){
        if(err) throw err;
        res.json(users);
    });
});
adminRouter.put("/block/:userId",function(req,res){
    User.updateUser(req.params.userId,{blocked:true},function(err,newUser){
        if(err) throw err;
        res.json(newUser);
    })
});

adminRouter.delete("/delete/:userId",function(req,res){
    User.deleteUser(req.params.userId,function(err,curentUser){
        if(err){
            res.status(500).send({message : 'error in deleting user'});
        }else{
           res.json(curentUser);
        }
    }) 
});


module.exports={authRouter,userRouter,adminRouter};