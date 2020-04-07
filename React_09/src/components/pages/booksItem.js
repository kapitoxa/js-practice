import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    render() {
        const{gotService, bookId} = this.props;
        return (
            <ItemDetails 
                itemId={bookId}
                getItem={gotService.getBook}>
                <Field field="name" label="Name"/>
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="publiser" label="Publiser"/>
                <Field field="released" label="Released"/>
            </ItemDetails>
        );
    }
}