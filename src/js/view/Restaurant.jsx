import React from 'react';
import '../../css/App.css';

import Jumbo from '../component/Jumbo.jsx';
import ReviewCard from '../component/ReviewCard.jsx';
import Badge from '../component/Badge.jsx';

import { Configuration } from '../configuration.js';
import { Container, Col, Row } from 'react-bootstrap';

import axios from 'axios';

class Restaurant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "-1",
            listOfReviews: [],
            hasTableBooking: 0,
            hasOnlineDelivery: 0,
            isDeliveringNow: 0,
            
            restaurantJumbo: {
                name: "",
                imageUrl: "",
                price: "",
                cuisines: "",
                rating: "",
                numberOfRatings: "",
                timings: "",
                location: {},
            },
            api_key: { headers: {'user-key': Configuration.API_KEY } }
        }

        this.renderReviews = this.renderReviews.bind(this);
    };
    
    componentDidMount() {
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id='+this.props.match.params.id, this.state.api_key).then(res => {
            
            let dollarSign = "";
            for(let i=0; i < res.data.price_range; i++) {
                dollarSign = dollarSign.concat("$");
            }
            
            document.title = "Füd | " + res.data.name;

            this.setState({
                id: res.data.id,
                hasTableBooking: res.data.has_table_booking,
                hasOnlineDelivery: res.data.has_online_delivery,
                isDeliveringNow: res.data.is_delivering_now,
                rating: res.data.user_rating.aggregate_rating,
                numberOfRatings: res.data.all_reviews_count,
                restaurantJumbo: {
                    name: res.data.name,
                    imageUrl: res.data.featured_image,
                    price: dollarSign,
                    cuisines: res.data.cuisines,
                    location: res.data.location,
                    timings: res.data.timings,
                }
            });
        });
    }

    renderReviews() {

        if(this.state.listOfReviews.length === 0) {
            axios.get('https://developers.zomato.com/api/v2.1/reviews?res_id='+this.state.id, this.state.api_key).then(res => {
                let listOfReviews = [];
            
                res.data.user_reviews.forEach(review => {
                    listOfReviews.push(
                        review
                    );
                });
                
                this.setState({
                    listOfReviews: listOfReviews
                });
            });
        } else {
            let reviews =[];

            reviews.push(
                <Col className="badge-placement text-left" md={12}>
                    <p className="bold">Rating : {this.state.rating} {(this.state.numberOfRatings.length === 0) ? "" : "("+this.state.numberOfRatings+")"}</p>
                </Col>
            )

            this.state.listOfReviews.forEach(review => {
                reviews.push(
                    <Col md={12}>
                        <ReviewCard review={review} />
                    </Col>
                );
            });

            return reviews;
        }
    }

    render() {
        return (    
            <React.Fragment>
                <Jumbo restaurantJumbo={this.state.restaurantJumbo} />
                <Container style={{marginLeft: "10px", marginRight: "10px", maxWidth: "100%"}}>
                    <Row className="badge-row">
                        <Col className="badge-placement text-right" md={4}>
                            <Badge trigger={this.state.hasTableBooking} icon={<i style={{marginLeft: "5px", marginRight: "5px"}} className="fas fa-users"></i>} title={"Table Booking"} />
                        </Col>

                        <Col className="badge-placement text-center" md={4}>
                            <Badge trigger={this.state.hasOnlineDelivery} icon={<i style={{marginLeft: "5px", marginRight: "5px"}} className="fas fa-desktop"></i>} title={"Online Delivery"} />
                        </Col>

                        <Col className="badge-placement text-left" md={4}>
                            <Badge trigger={this.state.isDeliveringNow} icon={<i style={{marginLeft: "5px", marginRight: "5px"}} className="fas fa-car-side"></i>} title={"Delivering Now"} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            {this.renderReviews()}
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Restaurant;