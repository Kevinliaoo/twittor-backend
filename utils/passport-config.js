const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const store = require('../api/components/users/store');

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = (await store.get({username: username}))[0];

        if(!user) {
            return done(null, false, {message: 'Not used found'});
        }

        try {
            const match = await bcrypt.compare(password, user.password);

            if(match) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect password'})
            }
        } catch(e) {
            done(e);
        }

    }
    passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser)); 
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, store.get({ _id: id }))
    })
}

module.exports = initialize;