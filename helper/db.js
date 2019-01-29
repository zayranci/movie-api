const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://movie_user:abcd1234@ds261128.mlab.com:61128/movie-api-1',{useMongoClient:true});
    mongoose.connection.on('open', () => {
       // console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};