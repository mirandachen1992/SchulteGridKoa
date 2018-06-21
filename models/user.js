import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name:String,
	age:Number,
	password:String,
	account:String,
	nickname:String,
	staut:Number
})

UserSchema.pre('save',function(next){
	next();
})

var User = mongoose.model('users',UserSchema);


export default User;



