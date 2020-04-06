import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default class ItemList extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem tag="button" action>John Snow</ListGroupItem>
                <ListGroupItem tag="button" action>Brandon Stark</ListGroupItem>
                <ListGroupItem tag="button" action>Geremy</ListGroupItem>
            </ListGroup>
        );
    }
}