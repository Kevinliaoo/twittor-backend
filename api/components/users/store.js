const mongoose = require('mongoose')

const Model = require('./model');

async function addUser(userData) {
    const newUser = new Model(userData); 
    try {
        const res = await newUser.save();
        return res;
    } catch(error) {
        return false; 
    }
} 

const getUserById = async uid => {
    if(!uid) return null; 
    
    try {
        const user = await Model.find({_id: uid})
        return user[0]; 
    } catch(e) {
        return false; 
    }
}

const getUser = async filter => {
    const user = await Model.find(filter);
    if(user.length === 0) {
        return false; 
    }
    return user;
}

const updateUser = async (uid, data) => {
    const foundUser = await Model.findOne({
        _id: uid
    }); 
    if(data.firstName) foundUser.firstName = data.firstName; 
    if(data.lastName) foundUser.lastName = data.lastName; 
    if(data.username) foundUser.username = data.username; 
    if(data.profileURL) foundUser.profileURL = data.profileURL;
    if(data.portraitURL) foundUser.portraitURL = data.portraitURL;
    const newUser = await foundUser.save(); 
    return newUser;
}

const removeFollower = async (user, follower) => {
    const foundUser = await getUserById(user); 
    const followerUser = await getUserById(follower);
    if(!foundUser || !followerUser) {
        return false; 
    }

    if(!foundUser.followers.includes(followerUser._id)) {
        return true;
    } 

    foundUser.followers.splice(foundUser.followers.indexOf(followerUser._id), 1); 
    followerUser.following.splice(followerUser.following.indexOf(foundUser._id), 1);

    await foundUser.save(); 
    await followerUser.save();

    return true;
}

const addFollower = async (user, follower) => {
    const foundUser = await getUserById(user); 
    const followerUser = await getUserById(follower);
    if(!foundUser || !followerUser) {
        return false; 
    }

    if(foundUser.followers.includes(followerUser._id)) {
        return true;
    }

    foundUser.followers.push(followerUser._id);
    followerUser.following.push(foundUser._id);

    await foundUser.save(); 
    await followerUser.save();

    return true;
}

module.exports = {
    add: addUser, 
    get: getUser, 
    getById: getUserById,
    update: updateUser, 
    addFollower, 
    removeFollower,
}