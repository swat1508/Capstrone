const express= require('express'),
restoRouter = express.Router(),
feedbackRouter=express.Router(),
ReviewModel=require("../mongoose/model"),
fileUploader=require('../middlewares/file-upload');

/* 
  Create all the Restaurant router
*/
restoRouter.post("/create", (req, res) => {
  req.body.createdBy=req.username;
  ReviewModel.findOrCreateRestaurant(req.body,function(err,restaurant){
    if(err){
      console.log(err);
      res.status(500).send("we are facing some problem, please try again later")
    }
    else{
      res.json(restaurant);
    }
  })
});

restoRouter.get("/getall", (req, res) => {
  ReviewModel.getAllRestaurant({},(err,restaurants)=>{
    if(err){
      res.status(500).send("we are facing some problem, please try again later");
    }
    else{
      res.json(restaurants);
    }
  })
});
restoRouter.put("/update/:restaurantId", (req, res) => {
  ReviewModel.updateRestaurant({_id:req.params.restaurantId},function(err,restaurant){
    if(err){
      res.status(500).send("we are facing some problem, please try again later");
    }
    else{
      res.json(restaurant);
    }
  })
});
restoRouter.delete("/delete/:restaurantId", (req, res) => {
  ReviewModel.deleteRestaurant({_id:req.params.restaurantId},function(err,restaurant){
    if(err){
      res.status(500).send("we are facing some problem, please try again later");
    }
    else{
      res.json(restaurant);
    }
  })
});
/* 
  Create all the feedback router with multiple imges
*/
feedbackRouter.post("/post/comment",fileUploader.array('commentImages',5), (req, res) => {
  req.body.createdBy=req.username;
  console.log(req.files);
  if(req.files&& req.files.length){
    const images=req.files.map(file=>{
      return {name:file.filename,path:file.path}
    })
    req.body.images=images;
  }
  console.log( req.body)
  ReviewModel.createFeedback(req.body,function(err,comment){
    if(err){
      console.log(err);
      res.status(500).send("we are facing some problem, please try again later")
    }
    else{
      res.json(comment);
    }
  })
});
feedbackRouter.get("/getall", (req, res) => {
  ReviewModel.getFeedback({},(err,feedbacks)=>{
    if(err){
      res.status(500).send("we are facing some problem, please try again later")
    }
    else{
      res.json(feedbacks);
    }
  })
});
feedbackRouter.get("/get", (req, res) => {
  const filterData=req.body;
  ReviewModel.getFeedback(filterData,function(err,feedbacks){
    if(err){
      res.status(500).send("we are facing some problem, please try again later")
    }
    else{
      res.json(feedbacks);
    }
  })
});
feedbackRouter.put("/update/:feedbackId", (req, res) => {
  ReviewModel.updateFeedback({_id:req.params.feedbackId},req.body,function(err,updatedFeedback){
    if(err){
      res.status(500).send("we are facing some problem, please try again later")
    }
    else{
      res.json(updatedFeedback);
    }
  })
})
feedbackRouter.delete("/delete/:feedbackId", (req, res) => {
  ReviewModel.deleteFeedback({_id:req.params.feedbackId},function(err,updatedPizza){
    if(err){
      res.status(500).send("we are facing some problem, please try again later")
    }
    else{
      res.json(updatedPizza);
    }
  })
})

module.exports={restoRouter,feedbackRouter};