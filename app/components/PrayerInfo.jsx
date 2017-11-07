var React = require("react");
var actions = require("../actions/PrayerActions");

module.exports = React.createClass({
    deletePrayer: function(e){
        console.log('PrayerInfo Delete')
        e.preventDefault();
        actions.deletePrayer(this.props.info);
    },    
    updatePrayer: function(e){
        console.log('PrayerInfo Update');
        e.preventDefault();
            this.props.info.clickcount +=1;
            var d = new Date();
            var n = d.getTime();
            console.log('date:'+n);
            this.props.info.lastprayed = n;
        actions.updatePrayer(this.props.info);
    },
    render:function(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.info.name}
                    <span className="pull-right text-uppercase delete-button" onClick={this.deletePrayer}>&times;</span>
                    <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
                </div>
                <div className="panel-body">
                    <span className="pull-right text-uppercase delete-button" onClick={this.updatePrayer}>&times;{this.props.info.clickcount}</span>
                    Times Prayed: {this.props.info.clickcount}<br/>
                    Pace: {this.props.info.pace}<br/>
                    Last Updated: {this.props.info.lastprayed}<br/>
                </div>
            </div>
        )
    }
})