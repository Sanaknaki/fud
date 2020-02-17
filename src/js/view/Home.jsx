import React from 'react';
import '../../css/App.css';

import axios from 'axios';

import RestaurantCard from '../component/RestaurantCard.jsx';
import Jumbo from '../component/Jumbo.jsx';
import RandomReviews from '../component/RandomReviews.jsx';

import { Configuration } from '../configuration.js';

import { Link } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cuisines: [],
			searchResult: [],
			chosenFilter: "Search",
			query: "",
            searching: false,
			api_key: { headers: {'user-key': Configuration.API_KEY} },
    
            restaurantJumbo: {
                name: "",
                imageUrl: "",
                price: "",
                cuisines: "",
                rating: "",
                numberOfRatings: ""
            },

			viewingRestaurant: ""
		}

		this.selectFilter = this.selectFilter.bind(this);
        this.search = this.search.bind(this);
        this.renderRandomPopularRestaurant = this.renderRandomPopularRestaurant.bind(this);
	}

	componentDidMount() {

		document.title = "Füd";

        this.renderRandomPopularRestaurant();
		
		axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id=89', this.state.api_key).then(cuisineList => {			
			this.setState({
				cuisines: cuisineList.data.cuisines
			});
		});
    };
    
    renderRandomPopularRestaurant() {

        axios.get('https://developers.zomato.com/api/v2.1/location_details?entity_id=89&entity_type=city', this.state.api_key).then(res => {

            let dollarSign = "";
            let randomlySelectedIndex = Math.floor(Math.random() * res.data.best_rated_restaurant.length);

            for(let i=0; i < res.data.best_rated_restaurant[randomlySelectedIndex].restaurant.price_range; i++) {
                dollarSign = dollarSign.concat("$");
			}
			
            this.setState({
                restaurantJumbo: {
                    name: res.data.best_rated_restaurant[randomlySelectedIndex].restaurant.name,
                    imageUrl: res.data.best_rated_restaurant[randomlySelectedIndex].restaurant.featured_image,
                    price: dollarSign,
                    cuisines: res.data.best_rated_restaurant[randomlySelectedIndex].restaurant.cuisines,
                    rating: res.data.best_rated_restaurant[randomlySelectedIndex].restaurant.user_rating.aggregate_rating,
                    numberOfRatings: res.data.best_rated_restaurant[randomlySelectedIndex].restaurant.all_reviews_count
                }
            });
        });
    };

	selectFilter(filter) {
        this.setState({
            chosenFilter: filter
        });
	};
	
	search(query) {	
		if(this.state.searching === false) {
			this.setState({
				searching: true
			});   
		}

		if(this.state.chosenFilter === "Cuisines") {
            let temp = true;

			this.state.cuisines.forEach(cuisine => {
				if(query.toLowerCase() === cuisine.cuisine.cuisine_name.toLowerCase()) {
                    temp = false;
					axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&count='+20+'&cuisines='+cuisine.cuisine.cuisine_id, this.state.api_key).then(res => {
						this.setState({
							searchResult: res.data.restaurants,
                            searching: false,
                            resultsFound: true,
							query: query
						});
					});
				}
            });

            if(temp) {
                this.setState({
                    searchResult: [],
                    searching: false,
                    resultsFound: true,
                    query: query
                });
            }
		} else {
			axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&q='+query+'&start&count='+20, this.state.api_key).then(res => {
				this.setState({
					searchResult: res.data.restaurants,
                    searching: false,
                    resultsFound: true,
					query: query
				});
        	});
		}
	};
	
	renderRestaurantCard() {
		if(this.state.searchResult.length !== 0) {
			let list = [];

			list.push(<Col key={"results"} md={12} className="text-left">Results for {this.state.query}</Col>)

			this.state.searchResult.forEach(item => {
				list.push(
					<Col key={this.props.id} md={4}>
						<Link to={{pathname: `/fud/restaurant/${item.restaurant.id}`}}>
							<RestaurantCard 
								viewDetails={this.viewDetails}
								item={item}
								name={item.restaurant.name}
								address={item.restaurant.location.address}
								rating={item.restaurant.user_rating.aggregate_rating} 
								numberOfRatings={item.restaurant.all_reviews_count}
								price={item.restaurant.price} 
								image={item.restaurant.featured_image}
								/>
						</Link>
					</Col>
				);
			});

			// list.push(
			// 	<Col key={this.props.id} md={4}>
			// 		<Jumbotron onClick={() => this.search(this.state.query, 2)} className="text-center result-card" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`}}>
			// 			<h3 className="white">Load More Results</h3>
			// 		</Jumbotron>
			// 	</Col>
			// );

			return list;
		} else {
            return (
                <Col md={12}>
                    <p>No results found for {this.state.query}</p>
                </Col>
            );
        }
	};

  	render() {

		let underJumbo = (this.state.resultsFound || this.state.cuisines.length === 0) ? <Container><Row>{this.renderRestaurantCard()}</Row></Container> : <div style={{marginLeft: "15px", marginRight: "15px"}}><h5>Reviews</h5><RandomReviews api_key={this.state.api_key} cuisines={this.state.cuisines}/></div>;

		return (
			<React.Fragment>
                <Jumbo 
                    restaurantJumbo={this.state.restaurantJumbo}
					selectFilter={this.selectFilter}
					chosenFilter={this.state.chosenFilter} 
					searching={this.state.searching} 
                    search={this.search}
				/>
				{underJumbo}
			</React.Fragment>
		);
  	}
}

export default Home;
