const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const mySchema = Schema({
    uid: {
        type: Schema.ObjectId,
        ref: 'users', 
    }, 
    content: {
        type: String, 
        max: 200, 
    }, 
    date: Date, 
    likes: [
        {
            type: Schema.ObjectId, 
            ref: 'users', 
        }
    ], 
    postId: {
        type: Schema.ObjectId, 
        ref: 'posts',
    }
})

const model = mongoose.model('comments', mySchema); 

module.exports = model; 