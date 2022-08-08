'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const ArticleSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        summary: { type: String, required: true },
        content: { type: String, required: true },
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'ArticleType' },
        tag: { type: Array, required: true },
        readtime: { type: Number, required: true },
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
    return mongoose.model('Article', ArticleSchema);
};