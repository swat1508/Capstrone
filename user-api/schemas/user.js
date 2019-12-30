const Mongoose 	= require('mongoose');
const bcrypt      = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "/assets/user.jpg";
const AddressSchema=new Mongoose.Schema({
    name:{ type: String,required: true},
    mobileNo:{type:Number, required: true},
    addressLine1:{type:String, required: true},
    addressLine2:{type:String, required: true},
    landmark:{type:String},
    pincode:{type:Number, required: true},
    addressType:{type:String, required: true},
    city:{type:String, required: true},
    state:{type:String, required: true}
})
const UserSchema = new Mongoose.Schema({
    username: { type: String, required: true},
    displayName:{ type: String},
    password: { type: String, default: null },// local user password should be assign
    socialId: { type: String, default: null },// social user social id should be there
    userImage:  { type: String, default:  DEFAULT_USER_PICTURE},
    role:{type: String, default: "user" },
    addresses:[AddressSchema],
    blocked:{type:Boolean}
});
UserSchema.pre('save', function(next) {
    const user = this;
    // ensure user picture is set
    if(!user.userImage){
        user.userImage = DEFAULT_USER_PICTURE;
    }
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
[UserSchema,AddressSchema].forEach((schema)=>{
    schema.set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }); 
})
// Create a user model
module.exports = Mongoose.model('user', UserSchema);
