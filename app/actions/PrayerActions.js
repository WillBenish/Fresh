var dispatcher = require("../dispatcher");

module.exports = {
    addPrayer:function(prayer){
        dispatcher.dispatch({
           prayer:prayer,
           type:"prayer:addPrayer" 
        });
    },
    deletePrayer:function(prayer){
        dispatcher.dispatch({
           prayer:prayer,
           type:"prayer:deletePrayer" 
        });
    }
}