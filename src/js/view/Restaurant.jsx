import React from 'react';
import '../../css/App.css';

import Jumbo from '../component/Jumbo.jsx';

import { Configuration } from '../configuration.js';

import axios from 'axios';

class Restaurant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantJumbo: {
                name: "",
                imageUrl: "",
                price: "",
                cuisines: "",
                rating: "",
                numberOfRatings: "",
                location: {},
                timings: "",
                hasTableBooking: 0,
                hasOnlineDelivery: 0,
                isDeliveringNow: 0,
                allReviews: []
            },
            api_key: { headers: {'user-key': Configuration.API_KEY } }
        }
    };

    componentDidMount() {
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id='+this.props.match.params.id, this.state.api_key).then(res => {
            
            let dollarSign = "";
            for(let i=0; i < res.data.price_range; i++) {
                dollarSign = dollarSign.concat("$");
            }
        
            this.setState({
                restaurantJumbo: {
                    name: res.data.name,
                    imageUrl: res.data.featured_image,
                    price: dollarSign,
                    cuisines: res.data.cuisines,
                    rating: res.data.user_rating.aggregate_rating,
                    numberOfRatings: res.data.all_reviews_count,
                    location: res.data.location.address,
                    timings: res.data.timings,
                    hasTableBooking: res.data.has_table_booking,
                    hasOnlineDelivery: res.data.has_online_delivery,
                    isDeliveringNow: res.data.is_delivering_now,
                    allReviews: res.data.all_reviews
                }
            });
        });
    }

    render() {
        return (
            <Jumbo restaurantJumbo={this.state.restaurantJumbo} />
        );
    }
}

export default Restaurant;