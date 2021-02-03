const Model = require('./model'); 

const addPost = async postData => {
    const newPost = new Model(postData);
    try {
        const res = await newPost.save(); 
        return res; 
    } catch(e) {
        return false; 
    }
}

// Get all posts of a user
const getPosts = async uid => {
    return new Promise((resolve, reject) => {
        Model.find({uid: uid})
            .populate('uid')
            .exec((error, populated) => {
                if(error) {
                    reject(error); 
                    return false; 
                }
                resolve(populated);
            })
    })
}

// Obtiene el post por el _id
const getPostById = async id => {
    const res = await Model.findOne({_id: id});
    return res;
}

const addLike = async (post, uid) => {
    post.likes.push(uid); 
    post.save();
    return post; 
}

const removeLike = async (post, uid) => {
    post.likes.splice(post.likes.indexOf(uid), 1);
    post.save(); 
    return post; 
}

const deletePost = async postId => {
    return Model.deleteOne({
        _id: postId
    })
}

module.exports = {
    post: addPost, 
    get: getPosts,
    getById: getPostById,  
    like: addLike, 
    unlike: removeLike, 
    remove: deletePost, 
}