const mongoose = require('mongoose');
const schema = require('./players.model');

schema.statics = {
    create: function(data, callback)
    {
        const document = new this(data);
        document.save(callback)
    },
    get: function(query, callback)
    {
        return this.find(query, callback);
    },
    getPopulate: function(query, callback)
    {
        this.find(query).populate('friends').exec(callback);
    },
    update: function(query, data, callback)
    {
        this.findOneAndUpdate(query, {$set: data}, {new: true}, callback);
    },
    delete: function(query, callback)
    {
        this.findOneAndDelete(query, callback);
    }
}

const model = mongoose.model('Players', schema);
module.exports = model;