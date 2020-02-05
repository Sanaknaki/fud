import React from 'react';
import '../../css/App.css';

import {Jumbotron} from 'react-bootstrap';

class RestaurantCard extends React.Component {
    render() {
        return (
            <Jumbotron className="text-center result-card" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.props.image})`}}>
                <h3 className="white bold">{this.props.name}</h3>
                <span className="white" style={{bottom: "0px !important"}}>{this.props.address}</span>
                <span className="white" style={{bottom: "0px !important"}}>{this.props.rating} ({this.props.numberOfRatings})</span>
            </Jumbotron>
        );
    }
}

export default RestaurantCard;