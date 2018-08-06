import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var TokenSchema = new Schema({
	access_token:String,
	expires_in: Number,
	save_time: Number
})

TokenSchema.pre('save',function(next){
	next();
})

var Token = mongoose.model('Token',TokenSchema);


export default Token;



