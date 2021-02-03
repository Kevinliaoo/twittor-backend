const store = require('./store');
const users = require('../users/store')
const auth = require('../../../auth'); 

const createPost = async data => {
    return new Promise(async (resolve, reject) => {
        // Check data 
        if(!data.uid) {
            reject('Not UID');
            return false; 
        }
        if(!data.content) {
            reject('Not message content');
            return false; 
        }
        
        data.date = new Date().toISOString();
        data.likes = [];

        const newPost = await store.post(data);

        if(newPost === false) {
            reject('Unable to create new Post');
            return false; 
        }
        resolve('New post posted');
    })
}

const getPosts = uid => {
    return new Promise(async (resolve, reject) => {
        if(!uid) reject('Not UID');
        const posts = await store.get(uid); 
        resolve(posts);
    })
}

const getPost = postId => {
    return new Promise(async (resolve, reject) => {
        const post = await store.getById(postId); 
        if(post) return resolve(post)
        reject('');
    })
}

// action = 0 to unlike
// action = 1 to like
const like = (postId, likerId, action) => {
    return new Promise(async (resolve, reject) => {
        const likerUser = await users.getById(likerId);
        if(likerUser === undefined || likerUser === null) {
            reject('Internal error'); 
            return false; 
        }

        const result = await store.getById(postId);
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

const deletePost = postId => {
    return new Promise(async (resolve, reject) => {
        const result = await store.remove(postId); 
        resolve()
    })
}

module.exports = {
    createPost,
    getPosts, 
    getPost,
    like, 
    deletePost, 
}