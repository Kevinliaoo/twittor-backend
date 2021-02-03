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

const query = async(username) => {
    // Search user by uid
    const user = await Model.findOne({
        username: username, 
    })
    return user || null; 
}

const updateUser = async(uid, data) => {
    const user = await Model.findOne({
        uid: uid, 
    })
    if(data.password) user.password = data.password; 
    if(data.username) user.username = data.username; 

    try {
        const newUser = await user.save();
        return newUser; 
    } catch(e) {
        return false; 
    }
}

module.exports = {
    add: addUser,
    query, 
    update: updateUser,
}