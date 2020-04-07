import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                });
            });
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <ListGroupItem 
                    key={id}
                    tag="button" 
                    onClick={() => this.props.onItemSelected(id)} 
                    action>
                    {label}
                </ListGroupItem>
            );
        }); 
    }

    render() {
        const {itemList, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        if (!itemList) {
            return <Spinner/>;
        }
        const items = this.renderItems(itemList);
        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}