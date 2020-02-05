import React from 'react';
import '../../css/App.css';

import { Card } from 'react-bootstrap';

class ReviewCard extends React.Component {
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

    render() {
        return (
            <Card style={{marginBottom: "15px", minHeight: "380px"}}>
                <Card.Header style={{backgroundColor:"#"+this.props.review.review.rating_color, borderBottom: "none", color: "white"}}>
                    {/* <span className="bold">{this.props.review.name}</span> ({this.props.review.review.rating}) */}
                    <img src={this.props.review.review.user.profile_image} className="review-user-profile" draggable={false} alt="Avatar"/>
                    <cite title="Reviewer">{this.props.review.review.user.name}</cite>
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        {this.props.review.name} (<span className="bold">{this.props.review.review.rating}</span>)
                        <p style={{fontSize: "15px"}}>{' '}{this.renderReview(280)}{' '}</p>
                        
                        <footer style={{position: "absolute", bottom: "0px"}} className="blockquote-footer">
                            <cite style={{fontSize: '12px'}} title='Date'>{this.props.review.review.review_time_friendly}</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
}

export default ReviewCard;