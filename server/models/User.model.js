const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [
            2,
            'Please enter a first name of 2 or more characters.'
        ]
    },
    lastName: {
        type: String,
        minlength: [
            2,
            'Please enter a first name of 2 or more characters.'
        ]
    },
    email: {
        type: String,
        unique: true,
        validate: [
          val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          'Please enter a valid email address.'
        ]
    },
    password: {
        type: String,
        minlength: [
            8,
            'Please enter a password of at least 8 characters.'
        ]
    }
}, {timestamps: true})

//virtual field - not stored in db at all, just used to validate - creates extra field 
//options objects - takes functions getter and setter 
UserSchema.virtual('passwordConfirmation', {
  get: () => this._passwordConfirmation, // the underscore is something we're not meant to touch directly - but available in the object 
  set: val => this._passwordConfirmation = val 
})

//to run something before regular validation mongoose is going to run 
//next will run everything has checked - if everything in this fucntion checks out - whatever comes next runs 
UserSchema.pre('validate', function(next) {
  if(this.password !== this.passwordConfirmation) {   // if they don't match then invalidate to not insert doc in db
      this.invalidate('passwordConfirmation', 'Please ensure your passwords match!');
  }
  //else
  next()
})

//to hash pw before saving 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10) //number of salts - the higher the number the more secure, but also more work for computer 
    .then(hashedPw => {
        this.password = hashedPw;
        next() // we call next here because we want for it to happen when the promise is resolved - once pw is hashed 
    })
})

module.exports = mongoose.model('User', UserSchema)