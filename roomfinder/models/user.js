// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var profileSchema = mongoose.Schema({
    userid: String,
    name : String,
    gender: String,
    dob: String,
    num: String,
    photos: [Object],
    pinfo: String,
    workname: String,
    workplace: String,
    workdescrip: String,
    rooms : [String],
    'Describe Yourself': [String],
    // questions: {
    //   'How often do you clean your apartment?': String,
    //   'Do you smoke?': String,
    //   'How do you feel about pets?': String,
    //   'How about guests?': String
    // },
    rooms:[String]  // roomid's
});

var userSchema = mongoose.Schema({
  userid: String,
  name : String,
  gender: String,
  dob: String,
  email: String,
  pwd: String,
  fbid: String,
});

var roomSchema = mongoose.Schema({
  roomid:String,  
  userid:String,
  agepref: [String],
  genderpref: String,
  drno: String,
  rent : Number,
  deposit : Number,
  location : {
    type: [Number],
    index:'2d'
  },
  duration: String,
  amenities : String,
  rules : String,
  photos : String,
  description: String
});

var areaSchema = mongoose.Schema({
  userid : String,
  rent : Number,
  roomid : String,
  location : {
    type: [Number],
    index:'2d'
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
User = mongoose.model('User', userSchema);
Room = mongoose.model('Room', roomSchema);
Profile = mongoose.model('Profile', profileSchema);
Area = mongoose.model('Area', areaSchema);

module.exports = {
    User: User,
    Room: Room,
    Profile: Profile,
    Area: Area
};
