const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/products', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
  .then(() => console.log('Established connection to the db'))
  .catch(err => console.log('Failed to connect to db', err))