import React from 'react';
import '../../css/App.css';

import { Container, Col, Row } from 'react-bootstrap';

class Huh extends React.Component {

    componentDidMount() {
        document.title = "Füd | Huh?";
    }

    render() {
        return (
            <React.Fragment>
                <Container style={{marginLeft: "10px", marginRight: "10px"}}>
                    <Row>
                        <Col md={12}>
                            <h1>Bro, huh?</h1>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Huh;