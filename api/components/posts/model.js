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
    comments: [
        {
            type: Schema.ObjectId, 
            ref: 'comments', 
        }
    ]
})

const model = mongoose.model('posts', mySchema); 

module.exports = model; 


/**
 * http://localhost:3001/api/posts/like/600584c4cf97974b607a1004/60039f86d4395139d14ad95c
 * 
 */