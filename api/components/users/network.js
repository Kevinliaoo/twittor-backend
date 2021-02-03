const express = require('express');

const response = require('../../../network/response');
const secure = require('./secure');
const controller = require('./controller'); 

const router = express.Router(); 

router.post('/', (req, res) => {
    controller.addUser(req.body)
        .then(result => response.success(req, res, result, 201))
        .catch(e => response.error(req, res, e, 500))
})

router.get('/:username', (req, res) => {
    controller.getUser(req.params.username)
        .then(user => {
            response.success(req, res, user, 200);
        })
        .catch(error => {
            response.error(req, res, error, 500);
        })
})

router.get('/id/:uid', (req, res) => {
    controller.getUserById(req.params.uid) 
        .then(user => response.success(req, res, user, 200))
        .catch(() => response.error(req, res, 'Internal error', 500));
})

router.patch('/follow/:id', secure(), (req, res) => {
    controller.follow(req.params.id, req.body.uid)
        .then(successMsg => response.success(req, res, successMsg, 200))
        .catch(e => response.error(req, res, e, 500));
})

router.patch('/unfollow/:id', secure(), (req, res) => {
    controller.unfollow(req.params.id, req.body.uid) 
        .then(successMsg => response.success(req, res, successMsg, 200))
        .catch(e => response.error(req, res, e, 500));
})

// secure es un middleware
router.put('/', secure(), (req, res) => {
    // Sólamente hace falta mandar el uid del usuario 
    // El primer callback se encargará de encontrar los datos del usuario 
    // y los asignará a req.user
    controller.update(req.body) 
        .then(() => response.success(req, res, 'Data updated', 200))
        .catch(e => {
            response.error(req, res, e, 500);
        }); 
})

module.exports = router;