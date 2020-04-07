import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {
    gotService = new GotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                });
            });
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <ListGroupItem 
                    key={id}
                    tag="button" 
                    onClick={() => this.props.onCharacterSelected(id)} 
                    action>
                    {name}
                </ListGroupItem>
            );
        }); 
    }

    render() {
        const {charList, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        if (!charList) {
            return <Spinner/>;
        }
        const items = this.renderItems(charList);
        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}