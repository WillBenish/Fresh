var mongoose = require("mongoose");
var crypto = require('crypto');

var mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;

function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc', process.env.SERVER_SECRET);
  var crypted = cipher.update(text.toString('binary'),'utf8','hex');
  crypted += cipher.final('hex');
  console.log('test encrypt');
  return crypted;
} 

function decrypt(text){
  if (text === null || typeof text === 'undefined') {return text;};
  var decipher = crypto.createDecipher('aes-256-cbc', process.env.SERVER_SECRET);
  var dec = decipher.update(text.toString('binary'),'hex','utf8');
  dec += decipher.final('utf8');
  console.log('test dencrypt');
  return dec;
}
 // twitterOAuthToken: {type: String, get: decrypt, set: encrypt}

var prayerSchema = mongoose.Schema({
    name: String,
    tagline: String,//{type: String, get: decrypt, set: encrypt},
    clickcount: Number,
    lastprayed: Number,
    pace: Number
});

 
//prayerSchema.plugin(mongooseFieldEncryption, {fields: ['tagline', 'name'], secret: 'some secret key'});

module.exports = mongoose.model("prayer", prayerSchema);