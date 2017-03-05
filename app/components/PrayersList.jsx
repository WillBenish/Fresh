var React = require("react");
var PrayerInfo = require("./PrayerInfo.jsx")
var AddPrayer = require("./AddPrayer.jsx");

module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
                <div className="col-md-6">
                    <AddPrayer />
                </div>
                <div className="col-md-6">
                    {
                        this.props.prayers.map(function(s,index){
                            return(
                                <PrayerInfo info={s} key={"prayer"+index} />
                            )         
                        })
                    }
                </div>
           </div>
       )
   } 
});