const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   title: {
      type: String,
      required: true
   },
   complete: {
      type: Boolean,
      default: false
   },
   totalTime: {
      type: Number,
      default: 0
   }
})

module.exports = model('Task', TaskSchema);