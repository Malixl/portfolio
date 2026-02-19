const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
        },
        description: {
            type: String,
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
        },
        image: {
            type: String,
        },
        tags: {
            type: [String],
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
