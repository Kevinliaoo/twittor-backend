const store = require('../api/components/users/store'); 

const checkUniqueUsername = () => {
    return async (req, res, next) => {
        const username = req.body.username;
        if(!username) {
            next(new Error('Username required'));
        }
        let notUnique = (await store.get({username: username})).length > 0; 

        if(notUnique) {
            next(new Error('Username already exists')); 
        } else {
            next();
        }
    }
}

const checkUniqueEmail = () => {
    return async (req, res, next) => {
        const email = req.body.email; 
        if(!email) {
            next(new Error('Email required')); 
        }
        let notUnique = (await store.get({email: email})).length > 0; 

        if(notUnique) {
            next(new Error('This email is already registered')); 
        } else {
            next();
        }
    }
}

module.exports = {
    username: checkUniqueUsername,
    email: checkUniqueEmail, 
}