var mongoose   = require("mongoose")
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect('mongodb://localhost/depa');
var passportLocalMongoose = require('passport-local-mongoose');

var ListingSchema = new mongoose.Schema({
  propertyType: String,
  image: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Listing", ListingSchema);
