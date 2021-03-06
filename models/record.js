import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  nickName: {
    type: String,
    required: true
  },
  openId: {
    type: String,
    unique: true,
    required: true
  },
  avatarUrl: {
    type: String,
    unique: true
  },
  record_type3: { type: Number, default: 0 },
  record_type4: { type: Number, default: 0 },
  record_type5: { type: Number, default: 0 },
})


RecordSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

RecordSchema.pre('save', function(next) {
  next();
})

var Record = mongoose.model('Record', RecordSchema);

export default Record;