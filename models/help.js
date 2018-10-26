import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var HelpSchema = new Schema({
  openId: {
    type: String,
    required: true
  },
  createTime: {
    type: String,
    required: true
  },
  missTime: {
    type: String,
    required: true
  },
  missName: {
    type: String,
    required: true
  },
  missSex: {
    type: String,
    required: false
  },
  missAddress: {
    type: String,
    required: true
  },
  missAddressText: {
    type: String,
    required: true
  },
  missDetailText: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactTel: {
    type: String,
    required: true
  },
  helpType: {
    type: String,
    required: true
  },
  picUrls: {
    type: Array,
    required: true
  },
})


HelpSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

HelpSchema.pre('save', function (next) {
  next();
})

var HelpSchema = mongoose.model('Help', HelpSchema);

export default HelpSchema;