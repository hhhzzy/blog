'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    });
    return mongoose.model('User', UserSchema);
};
