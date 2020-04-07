import React, {Component} from 'react';

import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {
    state = {
        selectedBook: 1, 
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id,
            error: false
        });
    }

    render() {
        const{gotService} = this.props;
        const{selectedBook, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={gotService.getAllBooks}
                renderItem={(item) => item.name}/>
        );
        const itemDetails = (
            <ItemDetails 
                itemId={selectedBook}
                getItem={gotService.getBook}>
                <Field field="name" label="Name"/>
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="publiser" label="Publiser"/>
                <Field field="released" label="Released"/>
            </ItemDetails>
        );
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        );
    }
}