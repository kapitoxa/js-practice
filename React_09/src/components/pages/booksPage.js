import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';

class BooksPage extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        const{error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const{gotService, history} = this.props;
        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    history.push(itemId);
                }}
                getData={gotService.getAllBooks}
                renderItem={(item) => item.name}/>
        );
    }
}

export default withRouter(BooksPage);