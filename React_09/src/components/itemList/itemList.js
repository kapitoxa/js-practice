import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

class ItemList extends Component {
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
        const {data} = this.props;
        const items = this.renderItems(data);
        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
};

ItemList.propTypes = {
    onItemSelected: PropTypes.func
};

const withData = (View) => {
    return class TheClass extends Component {
        state = {
            data: null,
            error: false
        }
    
        componentDidMount() {
            const {getData} = this.props;
    
            getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        }

        componentDidCatch() {
            this.setState({
                error: true
            });
        }

        render() {
            const {data, error} = this.state;
            if (error) {
                return <ErrorMessage/>;
            }
            if (!data) {
                return <Spinner/>;
            }
            return <View {...this.props} data={data}/>;
        }
    };
};

export default withData(ItemList);