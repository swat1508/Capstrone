const {RestaurantModel,FeedbackModel} = require('./schema');
function findRestaurant(id,callback){
	if(callback){
		RestaurantModel.findById(id,callback);
	}else{
		return restaurant.save();
	}
}
function updateRestaurant(filter,data,callback){
	const update = { $inc: data};
	if(callback){
		RestaurantModel.findOneAndUpdate(filter, update,{new: true,upsert: true },callback);
	}
	else{
		return RestaurantModel.findOneAndUpdate(filter, update,{new: true,upsert: true});
	}
}
function deleteRestaurant(filter,callback){
	if(callback){
		RestaurantModel.findOneAndUpdate(filter,{isDeleted:true} ,{new: true,upsert: true },callback);
	}
	else{
		return RestaurantModel.findOneAndUpdate(filter,{isDeleted:true},{new: true,upsert: true});
	}
}
function createFeedback(postData,callback){
	findRestaurant(postData.restaurantId,(err,restaurant)=>{
		const feedback = new FeedbackModel(postData);
		feedback.save((err,newfeedback)=>{
			if(callback){
				if(err){
					callback(err);
				}
				else{
					restaurant.feedbacks.push(feedback);
					restaurant.save((err,success)=>{
						callback(err,newfeedback)
					});
				}
			}else{
				return newfeedback;
			}
		});
	})
}
function findOrCreateRestaurant(postData,callback){
	RestaurantModel.findOne({'placeId': postData.placeId}).populate("feedbacks").exec().then(restaurant=>{
		if(restaurant){
			callback(null,restaurant)
		} else {
			const restaurant = new RestaurantModel(postData);
			if(callback){
				restaurant.save(callback);
			}else{
				return restaurant.save();
			}
		}
	}).catch(err=>{
		callback(err) 
	})
}
function getAllRestaurant(postData,callback){
	if(callback){
		RestaurantModel.find(postData).populate('feedbacks').exec(callback);
	}else{
		return restaurant.find(postData).populate('feedbacks').exec();
	}
}
function getFeedback(filter,callback){
	if(callback){
		FeedbackModel.find(filter,callback);
	}
	else{
		return FeedbackModel.find(filter);
	}
}
function updateFeedback(filter,data,callback){
	const update = { $inc: data};
	if(callback){
		FeedbackModel.findOneAndUpdate(filter, update,{new: true,upsert: true },callback);
	}
	else{
		return FeedbackModel.findOneAndUpdate(filter, update,{new: true,upsert: true});
	}
}
function deleteFeedback(filter,callback){
	if(callback){
		FeedbackModel.findOneAndUpdate(filter,{isDeleted:true} ,{new: true,upsert: true },callback);
	}
	else{
		return FeedbackModel.findOneAndUpdate(filter,{isDeleted:true},{new: true,upsert: true});
	}
}

module.exports = {findOrCreateRestaurant,createFeedback,getAllRestaurant,
	getFeedback, updateFeedback,deleteFeedback,deleteRestaurant,updateRestaurant}

