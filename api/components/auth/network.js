const express = require('express');

const response = require('../../../network/response');
const controller = require('./controller'); 

const router = express.Router(); 

router.post('/login', (req, res) => {
    controller.login(req.body.username, req.body.password)
        .then(token => response.success(req, res, token, 200))
        .catch(error => response.error(req, res, 'Invalid information', 400));
})

module.exports = router; 