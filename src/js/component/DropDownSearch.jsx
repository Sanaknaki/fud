import React from 'react';
import '../../css/App.css';

import { InputGroup, Dropdown, DropdownButton, FormControl, Button, Row, Col } from 'react-bootstrap';

class DropDownSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
        }

        this.updateSearchQuery = this.updateSearchQuery.bind(this);
    };

    renderListOfFilters(list) {
        let returnList = [];

        list.forEach(item => {
            returnList.push(<Dropdown.Item onClick={() => this.props.selectFilter(item.name)} href="#"><Row><Col md={1} className="text-left">{item.icon}</Col><Col md={8}>{item.name}</Col></Row></Dropdown.Item>);
        });

        return returnList;
    };

    updateSearchQuery(e) {
        this.setState({
            searchQuery: e.target.value
        });
    };

    render() {
        return (
            <InputGroup className="mb-3" placeholder="Hi">
                <DropdownButton style={{outline: "none !important"}} as={InputGroup.Prepend} variant="danger" title={(this.props.chosenFilter === "" ? "Select Filter" : this.props.chosenFilter)} id="input-group-dropdown-1">
                    {this.renderListOfFilters(this.props.listOfSearchFilters)}
                </DropdownButton>
                <FormControl value={(this.state.searchQuery) === "" ? "" : this.state.searchQuery} onChange={this.updateSearchQuery} className="drop-down-search" placeholder="Search" />

                <InputGroup.Append>
                    <Button style={{outline: "none !important", borderRadius: "0px 5px 5px 0px"}} onClick={() => this.props.search(this.state.searchQuery)} variant="danger" disabled={((this.props.chosenFilter === "" || this.state.searchQuery === "" || this.props.searching) ? true : false)}>
                        {(this.props.searching) ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search"></i>}
                    </Button>
                    
                    <span onClick={() => console.log("boop!")} className="white randomizer"><i className="fas fa-random"></i></span>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default DropDownSearch;