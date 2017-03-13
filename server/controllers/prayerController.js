var mongoose = require("mongoose");
var Prayer = require("../data/prayer");
var _ = require("underscore");
mongoose.Promise = global.Promise;

var router = require("express").Router();
router.route("/prayers/:id?").get(getPrayers).post(addPrayer).delete(deletePrayer).put(updatePrayer);

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

    console.log(JSON.stringify(aggr));
    console.log(aggr[0]);
    console.log('test')
    var prayPerDay =1;
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
    console.log('prayerController Update');
    prayer.clickcount += 1;
    console.log(JSON.stringify(prayer));
    console.log(prayer.clickcount);
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