const userModel = require('../schemas/user'),
jsonWebToken = require('jsonwebtoken'),
keys = require('../config/keys');
var usersProjection = { 
	__v: false,
	password: false
};
 function create(data, callback){
		const newUser = new userModel(data);
		newUser.save(callback);
}
function findOne(data, callback){
	userModel.findOne(data, callback);
}
function find(data, callback){
	userModel.find(data, callback);
}
function findById(id, callback){
	userModel.findById(id,usersProjection, callback);
}
function updateUser(id,data,callback){
	userModel.findOneAndUpdate({_id:id},  {$set: data},{upsert: true, new: true },callback);
}
function deleteUser(id,callback){
	userModel.findOneAndDelete({_id:id},callback);
}
function createAndUpdateAddress(id,address,callback){
	userModel.findOneAndUpdate({_id:id},{$push:{"addresses":address}},{upsert: true, new: true },callback);
}
function deleteAddress(id,addressId,callback){
	userModel.findOneAndUpdate({_id:id},{$pull:{"addresses":{_id:addressId}}},{upsert: true,new: true },callback);
}
function updateAddress(id,addressId,updatedAddress,callback){
	console.log(addressId,updatedAddress);
	userModel.findOneAndUpdate({_id:id},{ $set:{"addresses.$[elem]": updatedAddress}},
	{ arrayFilters: [{"elem.id":addressId }],upsert: true,new: true},callback);
}

function findOrCreate(data, callback){
	userModel.findOne({'socialId': data.id},(err, user)=>{
		if(err) { return callback(err); }
		if(user){
			return callback(err, user);
		} else {
			var userData = {
				displayName: data.displayName,
				socialId: data.id,
			};
			if(data.provider == "facebook"){
				userData.username=data.emails;
				userData.userImage = "http://graph.facebook.com/" + data.id + "/picture?type=large";
			}
			if(data.provider == "google"){
				userData.username=data.emails[0].value;
				userData.userImage = data.photos[0].value;
			}
			create(userData, function(err, newUser){
				callback(err, newUser);
			});
		}
	});
}
function verifyJwtToken(req,callback){
	const token = req.body.token || req.query.token || req.headers['authorization'];
	if (token) {
		jsonWebToken.verify(token, keys.jwtSecret, (err, decoded) => {
			if (err) {
				callback ({status:401, ok: false, message: 'Failed to authenticate token.' });
			} else {
				console.log("token has been verified using secure keys");
				const response=decoded;
				response.ok=true;
				callback(response)
			}
		});
	} else {
		callback({status:401, ok: false, message: 'No token provided.' });
	}
}
function createJwtToken(user,callback){
	const tempObj = { username: user.username,role:user.role,id:user._id}
	let token = jsonWebToken.sign(tempObj, keys.jwtSecret, {
		expiresIn: 3600 * 24
	});
	console.log("token has been created using secure keys");
	callback(token) ;
}
module.exports = {create,findById,find,findOne,
	findOrCreate,verifyJwtToken,createJwtToken,
	updateUser,deleteUser,createAndUpdateAddress,deleteAddress,updateAddress
};
