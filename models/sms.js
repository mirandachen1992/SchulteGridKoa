import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var SMSSchema = new Schema({
  openId: {
    type: String,
    required: true
  },
  createTime: {
    type: String,
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  tel: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: ''
  }
})


SMSSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

SMSSchema.pre('save', function (next) {
  next();
})

var SMSModel = mongoose.model('SMS', SMSSchema);

export default SMSModel;