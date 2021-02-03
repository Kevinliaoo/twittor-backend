const user = require('../api/components/users/network');
const auth = require('../api/components/auth/network');
const posts = require('../api/components/posts/network');
const comments = require('../api/components/comments/network');

const routes = server => {
    server.use('/api/users', user);
    server.use('/api/auth', auth);
    server.use('/api/posts', posts);
    server.use('/api/comments', comments);
}

module.exports = routes; 