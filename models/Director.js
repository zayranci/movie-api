const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: [60, '`{PATH}` alanı ({VALUE}),({MAXLENGTH}) karakteden az olmalıdır.'],
        minlength: [2, '`{PATH}` alanı ({VALUE}),({MINLENGTH}) karakteden çok olmalıdır.']
    },
    surname:{
        type: String,
        maxlength: [60, '`{PATH}` alanı ({VALUE}),({MAXLENGTH}) karakteden az olmalıdır.'],
        minlength: [2, '`{PATH}` alanı ({VALUE}),({MINLENGTH}) karakteden çok olmalıdır.']
    },
    bio:{
        type: String,
        maxlength: [1000, '`{PATH}` alanı ({VALUE}),({MAXLENGTH}) karakteden az olmalıdır.'],
        minlength: [2, '`{PATH}` alanı ({VALUE}),({MINLENGTH}) karakteden çok olmalıdır.']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports= mongoose.model('director',DirectorSchema);