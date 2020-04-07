import React, {Component} from 'react';
import styled from 'styled-components';
import {ListGroup, ListGroupItem} from 'reactstrap';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import Term from '../term';

const DetailsLayout = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

export default class ItemDetails extends Component {
    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        this.onError();
    }

    updateItem() {
        const {itemId, getItem} = this.props;
        if (!itemId) {
            return;
        }
        getItem(itemId)
            .then((item) => this.setState({
                item,
                loading: false
            }))
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    render() {
        const {item, loading, error} = this.state;
        if (!item) {
            return <SelectError>Please select an item</SelectError>;
        }
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? <View item={item}>{this.props.children}</View> : null;
        return (
            <DetailsLayout className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </DetailsLayout>
        );
    }
}

const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <Term>{label}</Term>
            <span>{item[field]}</span>
        </ListGroupItem>
    );
};

export {Field};

const View = ({item, children}) => {
    const {name} = item;
    return (
        <>
            <h4>{name}</h4>
            <ListGroup flush>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item});
                    })
                }
            </ListGroup>
        </>
    );
};