'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const TagSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        createdTime: { type: Date, default: Date.now }
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    });
    return mongoose.model('Tag', TagSchema);
};