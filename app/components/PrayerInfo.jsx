var React = require("react");
var actions = require("../actions/PrayerActions");

module.exports = React.createClass({
    deletePrayer: function(e){
        e.preventDefault();
        actions.deletePrayer(this.props.info);
    },
    render:function(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.info.name}
                    <span className="pull-right text-uppercase delete-button" onClick={this.deletePrayer}>&times;{this.props.info._id}</span>
                </div>
                <div className="panel-body">{this.props.info.tagline}</div>
            </div>
        )
    }
})