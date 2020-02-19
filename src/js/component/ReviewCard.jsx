import React from 'react';

import '../../css/App.css';

import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';


class ReviewCard extends React.Component {
    constructor(props) {
        super(props);

        this.renderCardLink = this.renderCardLink.bind(this);
    }
    renderReview(limit) {
        const dots = "...";
        let editedString = "";
        if(this.props.review.review.review_text.length > limit) {
            editedString = this.props.review.review.review_text.substring(0, limit) + dots;

            return editedString;
        } else if(this.props.review.review.review_text.length === 0) {
            editedString = "No comment provided.";

            return editedString;
        }else {
            return this.props.review.review.review_text;
        }
    }

    renderCardLink() {
        let card = (
            <Card style={{marginBottom: "15px", minHeight: "380px"}}>
                    <Card.Header style={{borderBottom: "none"}}>
                        <img src={this.props.review.review.user.profile_image} className="review-user-profile" draggable={false} alt="Avatar"/>
                        <cite title="Reviewer">{this.props.review.review.user.name}</cite>
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="text-center blockquote mb-0">
                            <h3>{this.props.review.name}</h3>
                            <h3 className="bold" style={{color:"#"+this.props.review.review.rating_color}}>{this.props.review.review.rating}</h3>
                            <p className="text-left" style={{fontSize: "15px"}}>{' '}{this.renderReview(280)}{' '}</p>
                            
                            <footer style={{position: "absolute", bottom: "0px"}} className="blockquote-footer">
                                <cite style={{fontSize: '12px'}} title='Date'>{this.props.review.review.review_time_friendly}</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
        );

        if(this.props.review.id) {
            return (
                <Link className="link" to={{pathname: `/fud?res=${this.props.review.id}`}}>
                    {card}
                </Link>
            );
        } else {
            return card;
        }
    }

    render() {
        return this.renderCardLink();
    }
}

export default ReviewCard;