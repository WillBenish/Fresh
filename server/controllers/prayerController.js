var mongoose = require("mongoose");
var Prayer = require("../data/prayer");
var _ = require("underscore");
var crypto = require('crypto');

mongoose.Promise = global.Promise;

var router = require("express").Router();
router.route("/prayers/:id?").get(getPrayers).post(addPrayer).delete(deletePrayer).put(updatePrayer);


function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc', 'Secret Key');
  var crypted = cipher.update(text.toString('binary'),'utf8','hex');
  crypted += cipher.final('hex');
  console.log('test encrypt');
  return crypted;
} 

function decrypt(text){
  if (text === null || typeof text === 'undefined') {return text;};
  var decipher = crypto.createDecipher('aes-256-cbc', 'Secret Key');
  var dec = decipher.update(text.toString('binary'),'hex','utf8');
  dec += decipher.final('utf8');
  console.log('test dencrypt');
  return dec;
}



function getPrayers(req, res) {
    var d = new Date();
    var n = d.getTime();

    var countList =1;// Prayer.find().count()
    Prayer.aggregate(
   [
      {
        $group : {
           _id : null,
           totalviews: { $sum: "$clickcount" },
           TimeElapsed: { $avg: {$subtract: [n ,"$lastprayed"]} },
           prayersPerDay: { $sum: {$divide: [1,"$pace"]}},
           count: { $sum: 1 }
        }
      }
   ], function( err, aggr){

   // console.log(JSON.stringify(aggr));
    //console.log(aggr[0]);
    //console.log('test')
    var prayPerDay =1;
    console.log(aggr.length);
    if(aggr.length>0){
     prayPerDay = Math.ceil(aggr[0].prayersPerDay);
    }
    
    console.log('limit: ' + prayPerDay);

      Prayer.aggregate([ 
            { $project: { 
                prayersort: {$divide :[{$subtract: ["$lastprayed",n]},"$pace"]},
                name: 1,
                clickcount: 1,
                tagline: 1,
                pace: 1

                }
            }
            ,{ $sort: {prayersort: 1}}
            ,{ $limit: prayPerDay}
            ]
            ,function (err, prayers) {
       console.log('aggregate ran');
        if (err){
            console.log(err);
           res.send(err);
       }
        else
            for (i = 0; i < prayers.length; i++) { 
            //console.log(prayers[i].name);
           if(prayers[i].name.length = 32){
            prayers[i].name = decrypt(prayers[i].name);
           };
           
           
            }
        console.log('First Prayer in list');
            console.log(JSON.stringify(prayers));
            console.log('woot');
             res.json(prayers);
    });
/*
    Prayer.find(function (err, prayers) {
        if (err)
            res.send(err);
        else
            res.json(prayers);
    })
    */


    ;
    
    
   }
);



}

function addPrayer(req, res) {
    var prayer = new Prayer(_.extend({}, req.body));
    console.log('Prayer Name:');
    console.log(prayer.name);
    prayer.name = encrypt(prayer.name);
    console.log(prayer.name);
    console.log(JSON.stringify(prayer));
    console.log('prayerController add new');
    prayer.save(function (err) {
        if (err){
            console.log('adding prayer, got error');
            console.log(err);
            res.send(err);
        }
        else
            res.json(prayer);
    });
}

function deletePrayer(req, res) {
    console.log('prayerController Delete Prayer');
    var id = req.params.id;
        Prayer.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

function updatePrayer(req, res) {
    var prayer = new Prayer(_.extend({}, req.body));
    //console.log('prayerController Update');
    //console.log(prayer.clickcount);  
    //prayer.clickcount += 0;
    //console.log(prayer.clickcount);
    //console.log(JSON.stringify(prayer));
    prayer.name = encrypt(prayer.name);
    var id = req.params.id;
    console.log(id);
   // alert('tester');
   Prayer.findOneAndUpdate({ _id: id},prayer, function(err, prayer) {
        if (err)
            res.send(err)
        else
            res.json(prayer);
    });
    
}

module.exports = router;