import mongoose, { model, mongo, Schema } from 'mongoose';

const schema = new Schema({
  // user_id: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  collection: 'message',
});
const Message = model('message', schema);

export default Message;
