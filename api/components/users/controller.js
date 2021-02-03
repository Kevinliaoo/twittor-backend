// El controlador tiene acceso a la capa de datos 
const store = require('./store');
const utils = require('../../utils');
const auth = require('../auth/controller');
const messages = require('../../../config').error_mesages;

const addUser = data => {
    return new Promise(async (resolve, reject) => {
        // Filtering 
        if(data === null) {
            reject(messages.missing_data); 
            return false; 
        } 
        if(data.password !== data.repeatPsw) {
            reject(messages.psw_not_match); 
            return false; 
        } 
        const hashedPsw = await utils.encryptPassword(data.password); 

        const userData = {
            username: data.username.toLowerCase(), 
            firstName: data.firstName, 
            lastName: data.lastName, 
            email: data.email,
            following: [], 
            followers: [], 
        }

        // Check repeated usernames
        const exists = (await store.get({username: userData.username})).length > 0;
        if(exists) {
            reject(messages.user_exists);
            return
        }

        // Insert new user in database 
        const newUser = await store.add(userData); 
        // Handle results 
        if(newUser === false) {
            reject(messages.unable);
            return false; 
        }

        await auth.createUser({
            uid: newUser._id, 
            username: newUser.username,
            password: hashedPsw, 
        })

        resolve('User created');
    })
}

const update = data => {
    return new Promise(async (resolve, reject) => {

        let authData = {}
        if(data.username) {
            authData.username = data.username.trim().toLowerCase(); 
        }

        if(data.password && data.repeatPsw) {
            if(data.password !== data.repeatPsw) {
                reject('Passwords do not match');
                return false;
            }
            const hashedPsw = await utils.encryptPassword(data.password); 
            delete data.repeatPsw;
            delete data.password; 
            authData.password = hashedPsw;
        } else if ((data.password && ! data.repeatPsw) || (!data.password && data.repeatPsw)) {
            return reject('Missing password');
        }

        if(Object.keys(authData).length > 0) {
            const result = await auth.updateUser(data.uid, authData);
            if(result === false) {
                reject('Unable to edit data'); 
                return false; 
            } 
        }

        const uid = data.uid; 
        delete data.uid;

        const result = store.update(uid, data); 

        if(result) {
            return resolve('Done')
        }
        return reject('Internal error');
    })
}

const getUser = username => {
    return new Promise(async (resolve, reject) => {
        const user = await store.get({username: username});
        if(user === false) {
            reject('User does not exist'); 
            return false; 
        }
        resolve(user); 
    })
}

const getUserById = _id => {
    return new Promise(async (resolve, reject) => {
        const user = await store.getById(_id); 
        if(user) return resolve(user); 
        reject(false);
    })
}

const follow = (following, follower) => {
    return new Promise(async (resolve, reject) => {
        const result = await store.addFollower(following, follower);

        if(result === false) return reject('User does not exist')
        else resolve('Done')
    })
}

const unfollow = (following, follower) => {
    return new Promise(async (resolve, reject) => {
        const result_ = await store.removeFollower(following, follower);

        if (result_ === true) {
            resolve('done')
            return;
        } else {
            reject('Internal error')
        }
    })
}

module.exports = {
    addUser,
    update, 
    getUser, 
    getUserById, 
    follow, 
    unfollow,
}