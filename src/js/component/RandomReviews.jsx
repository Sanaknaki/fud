import React from 'react';
import '../../css/App.css';

import ReviewCard from './ReviewCard.jsx';

import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

class RandomReviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            reviews: []
        }

        this.renderReviews = this.renderReviews.bind(this);
    };

    componentDidMount() {

        const randomCuisineNumber = Math.floor(Math.random() * this.props.cuisines.length);
        const randomCuisine = this.props.cuisines[randomCuisineNumber].cuisine_id;

        axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&cuisines='+ randomCuisine + '&sort=rating', this.props.api_key).then(res => {
            let list=[];
            
            for(let i=0; i<3; i++) {
                let obj = {};
                let randomRestaurantNumber = Math.floor(Math.random() * res.data.restaurants.length);

                obj.id = res.data.restaurants[randomRestaurantNumber].restaurant.id;
                obj.name = res.data.restaurants[randomRestaurantNumber].restaurant.name
                list.push(obj);
            }

            return list;
        }).then((res => {
            res.forEach(obj => {
                axios.get('https://developers.zomato.com/api/v2.1/reviews?res_id='+obj.id, this.props.api_key).then(res => {

                    let listOfReviews = this.state.reviews;

                    let reviewObject = {};
                    reviewObject.id = obj.id
                    reviewObject.name = obj.name;
                    reviewObject.review = res.data.user_reviews[Math.floor(Math.random() * res.data.user_reviews.length)].review

                    listOfReviews.push(reviewObject);

                    this.setState({
                        reviews: listOfReviews
                    });
                });
            });
        }));
    };

   renderReviews() {
        let { reviews } = this.state;
        let listOfReviews = [];
        
        reviews.sort((a, b) => b.review.rating - a.review.rating);

        reviews.forEach(review => {
            listOfReviews.push(
                <Col key={review.id} md={4}>
                    <ReviewCard review={review}/>
                </Col>
            )
        });

        return(
            <Row>
                {listOfReviews}
            </Row>
        );
    } 

    render() {
        return (
            <React.Fragment>
                {this.renderReviews()} 
            </React.Fragment>
        );
    }
}

export default RandomReviews;