const usersCtl = require('../controllers/users.controller')

module.exports = app => {
    app.post('/api/users', usersCtl.register)
}