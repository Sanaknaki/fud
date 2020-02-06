import React from 'react';
import '../../css/App.css';

class Badge extends React.Component {

    render() {

        let trigger = (this.props.trigger) ? "green" : "lightgray"

        return (
            <div style={{display: "inline-block", maxWidth: "200px", border: "2px solid " + trigger, color: trigger, padding: "5px 5px 5px 5px", borderRadius: "20px"}}>
                {this.props.icon} <span className="badge-text">{this.props.title}</span>
            </div>
        );
    }
}

export default Badge;