const store = require('./store');
const users = require('../users/store')

const createComment = async data => {
    return new Promise(async (resolve, reject) => {
        // Check data 
        if(!data.uid) {
            reject('Not UID');
            return false; 
        }
        if(!data.postId) {
            reject('Not Post ID'); 
            return false; 
        }
        if(!data.content) {
            reject('Not message content');
            return false; 
        }
        if(!data.date) {
            data.date = Date.now();
        }
        data.likes = [];

        const newComment = await store.comment(data);

        if(newComment === false) {
            reject('Unable to create new Comment');
            return false; 
        }
        resolve('New comment commented');
    })
}

// action = 0 to unlike
// action = 1 to like
const like = (commentId, likerId, action) => {
    return new Promise(async (resolve, reject) => {
        const likerUser = await users.getById(likerId);
        if(likerUser === undefined || likerUser === null) {
            reject('Internal error'); 
            return false; 
        }

        const result = await store.getById(commentId);
        if(result === undefined || result === null) {
            reject('Internal error'); 
            return false; 
        }

        if(result.likes.includes(likerUser._id) === false) {
            if(action === 1) store.like(result, likerUser._id);
            resolve('Post liked');
            return true; 
        }
        if(result.likes.includes(likerUser._id) === true) {
            if(action === 0) store.unlike(result, likerUser._id);
            resolve('Post unliked'); 
            return true; 
        }

        reject('Internal error');
    })
}

const deleteComment = commentId => {
    return new Promise(async (resolve, reject) => {
        const result = await store.remove(commentId); 
        resolve()
    })
}

const getComments = postId => {
    return new Promise(async (resolve, reject) => {
        if(!postId) reject('Not Post ID');
        const posts = await store.get(postId); 
        resolve(posts);
    })
}

module.exports = {
    createComment,
    like, 
    deleteComment, 
    getComments, 
}