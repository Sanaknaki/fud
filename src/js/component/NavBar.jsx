import React from 'react';
import '../../css/App.css';

import IconWhite from '../../img/icon-white.png';

import { Link } from "react-router-dom";

import {Navbar} from 'react-bootstrap';

import {withRouter} from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    };

    render() {

        return (
            <Navbar fixed="top" style={{backgroundColor: "transparent"}}>
                <Navbar.Brand><font className="white"><Link to ="/"><img src={IconWhite} height={30} draggable={false} alt="Icon" /></Link></font></Navbar.Brand>
            </Navbar>
        );
    }
}

export default withRouter(NavBar);