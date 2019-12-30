const Mongoose 	= require('mongoose');
const Schema=Mongoose.Schema;
const RatingSchema= new Schema({
    bathroomQuality:{ type: Number, default:0},
    staff:{ type: Number, default:0},
    cleanliness:{ type: Number, default:0},
    delivery:{ type: Number, default:0}
});
const imageSchema= new Schema({
    name:{ type: String},
    path:{ type: String}
})
const FeedbackSchema= new Schema({
    review:{ type: String},
    likes:{ type: Number, default:0},
    dislikes:{ type: Number, default:0},
    commentBy:{ type: String, default:"Guest"},
    date:{ type: Date, default:Date.now},
    images:[imageSchema],
    rating:RatingSchema,
    isDeleted:{ type: Boolean, default:false,select : false},
    useful:{ type: Number, default:0},
    funny:{ type: Number, default:0}
});
const FeedbackModel=Mongoose.model('feedback', FeedbackSchema);

const RestaurantSchema= new Schema({
    placeId:{ type: String, required: true},
    icon:{ type: String},
    address:{ type: String, required: true},
    name:{ type: String, required: true},
    position:{ type: Object},
    website:{ type: String, required: true},
    phone:{ type: String, required: true},
    types:[{type:String}],
    feedbacks:[
        {
            type:Mongoose.Schema.Types.ObjectId,
            ref:"feedback"
        }
    ]
});
// All schema with return all the _id to id 
[RatingSchema,imageSchema,RestaurantSchema,FeedbackSchema].forEach((schema)=>{
    schema.set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }); 
})
const RestaurantModel=Mongoose.model('restaurant', RestaurantSchema);
 module.exports = {RestaurantModel,FeedbackModel}
