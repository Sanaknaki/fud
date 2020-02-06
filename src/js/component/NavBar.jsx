import React from 'react';
import '../../css/App.css';

import Icon from '../../img/icon-white.png';

import { Link } from "react-router-dom";

import {Navbar, Nav } from 'react-bootstrap';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    };

    render() {
        return (
            <Navbar fixed="top" style={{backgroundColor: "transparent"}}>
                <Navbar.Brand><font className="white"><Link to ="/"><img src={Icon} height={30} draggable={false} alt="Icon" /></Link></font></Navbar.Brand>
                <Nav className="mr-auto" />
                <Nav>
                    <Nav.Link><Link to="/huh/"><i style={{color: "white"}} className="fas fa-question"></i></Link></Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;