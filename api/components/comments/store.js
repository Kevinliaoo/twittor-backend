const Model = require('./model'); 

const addComment = async postData => {
    const newComment = new Model(postData);
    try {
        const res = await newComment.save(); 
        return res; 
    } catch(e) {
        return false; 
    }
}

const addLike = async (comment, uid) => {
    comment.likes.push(uid); 
    comment.save();
    return comment; 
}

const removeLike = async (comment, uid) => {
    comment.likes.splice(comment.likes.indexOf(uid), 1);
    comment.save(); 
    return comment; 
}

const deleteComment = async commentId => {
    return Model.deleteOne({
        _id: commentId
    })
}

// Obtiene el post por el _id
const getCommentById = async id => {
    const res = await Model.findOne({_id: id});
    return res;
}

const getComments = async postId => {
    const res = await Model.find({postId: postId}); 
    return res; 
}

module.exports = {
    comment: addComment, 
    like: addLike, 
    unlike: removeLike, 
    remove: deleteComment, 
    getById: getCommentById, 
    get: getComments,
}