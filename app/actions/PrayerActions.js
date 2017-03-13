var dispatcher = require("../dispatcher");

module.exports = {
    addPrayer:function(prayer){
        dispatcher.dispatch({
           prayer:prayer,
           type:"prayer:addPrayer" 
        });
    },
    deletePrayer:function(prayer){
      console.log('PrayerActions deletePrayer');
        dispatcher.dispatch({
           prayer:prayer,
           type:"prayer:deletePrayer" 
        });
    },
    updatePrayer:function(prayer){
        console.log('PrayerActions Update');
        dispatcher.dispatch({
           prayer:prayer,
           type:"prayer:updatePrayer" 
        });
    }
}