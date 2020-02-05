import React from 'react';
import '../../css/App.css';

import DropDownSearch from '../component/DropDownSearch.jsx';
import { Jumbotron, Col, Row, Container, Badge } from 'react-bootstrap';

class Jumbo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            listOfSearchFilters: [{icon: <i className="fas fa-comment"></i>, name:"Keyword"}, {icon: <i className="fas fa-utensils"></i>, name:"Cuisines"}],
        }

        this.renderJumboBody = this.renderJumboBody.bind(this);
    };

    renderJumboBody() {
        let body = [];

        if(Object.keys(this.props.restaurantJumbo).length === 6) {
            body.push(
                <React.Fragment>
                    <Container>
                        <Row className="text-center">
                            <Col md={12}>
                                <h1 className="white bold">FÜD<span className="bold" style={{fontSize: "15px"}}><Badge style={{backgroundColor: "red"}}>TORONTO</Badge></span></h1>
                                <DropDownSearch 
                                    searching={this.props.searching} 
                                    search={this.props.search} 
                                    selectFilter={this.props.selectFilter} 
                                    chosenFilter={this.props.chosenFilter} 
                                    listOfSearchFilters={this.state.listOfSearchFilters} 
                                />
                            </Col>
                        </Row>
                    </Container>
                    
                    <Row className="jumbotron-fud-favourite">
                        <Col md={6} className="text-left" style={{paddingLeft: "0px"}}>
                            <span className="white">Daily Füd Favourite</span>
                        </Col>
                        <Col md={6} className="text-right" style={{paddingRight: "0px"}}>
                            <span className="white text-right"><span className="bold">{this.props.restaurantJumbo.name}</span> • {this.props.restaurantJumbo.cuisines} • {this.props.restaurantJumbo.rating}  {"(" + this.props.restaurantJumbo.numberOfRatings + ")"} • {this.props.restaurantJumbo.price}</span>
                        </Col>
                    </Row>
                </React.Fragment>
            );
        } else {
            body.push(
                <React.Fragment>
                    <Container>
                        <Row className="white text-center">
                            <Col md={12}>
                                <h1 className="bold">{this.props.restaurantJumbo.name}</h1>
                            </Col>

                            <Col md={12}>
                                <h5>{this.props.restaurantJumbo.rating}  {"(" + this.props.restaurantJumbo.numberOfRatings + ")"}</h5>
                            </Col>

                            <Col md={12}>
                                <h5>{this.props.restaurantJumbo.price}</h5>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            );
        }

        return body;
    }

    render() {
        return (
            <Jumbotron style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.props.restaurantJumbo.imageUrl})`}}>
                {this.renderJumboBody()}
			</Jumbotron>
        );
    }
}

export default Jumbo;