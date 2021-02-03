const store = require("./store");
const userStore = require('../users/store');
const auth = require('../../../auth');
const utils = require('../../utils');

function createUser(data) {
    const authData = {
        uid: data.uid, 
    }
    if(data.username) {
        authData.username = data.username; 
    }
    if(data.password) {
        authData.password = data.password; 
    }

    return store.add(authData);
} 

const login = async (username, password) => {
    username = username.toLowerCase();
    // Get user data
    const data = await store.query(username); 
    if(!data) {
        throw new Error('Invalid information'); 
    }
    const user = (await userStore.get({username: username}))[0];

    // Password checking 
    const samePassword = await utils.compare(password, data.password); 

    if(samePassword) {
        // Generar el token 
        const jwt = auth.sign(data)
        return {
            jwt: jwt, 
            user: user
        }
    } else {
        throw new Error('Invalid infromation');
    }
}

const updateUser = async (uid, newData) => {
    const result = await store.update(uid, newData);
}

module.exports = {
    login, 
    createUser,
    updateUser,
}