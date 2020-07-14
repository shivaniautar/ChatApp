const User = require('../models/User.model')

module.exports = {
    register(req, res) {
        User.create(req.body)
        .then(newUser => res.json({
            status: 'Success',
            id: newUser._id
        }))
        .catch(error => res.status(400).json(error))
    },

    async login(req, res) {
        const{email, password} = req.body
        try {
             //find user by email
            const user = User.findOne({email})

        } catch(e) {

        }
      
      //confirm pw is a match
      //store user info 

    }
}