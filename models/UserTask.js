const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'TODO'
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


taskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

taskSchema.set('toJSON', {
    virtuals: true,
});

exports.UserTask = mongoose.model('UserTask', taskSchema);
