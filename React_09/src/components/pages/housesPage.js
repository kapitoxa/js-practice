import React, {Component} from 'react';

import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
    state = {
        selectedHouse: 1,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id,
            error: false
        });
    }

    render() {
        const {selectedHouse, error} = this.state;
        console.log('render house', selectedHouse);
        if (error) {
            return <ErrorMessage/>;
        }
        const{gotService} = this.props;
        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={gotService.getAllHouses}
                renderItem={(item) => item.name}/>
        );
        const itemDetails = (
            <ItemDetails 
                itemId={selectedHouse}
                getItem={gotService.getHouse}>
                <Field field="name" label="Name"/>
                <Field field="region" label="Region"/>
                <Field field="words" label="Words"/>
                <Field field="titles" label="Titles"/>
                <Field field="overlord" label="Overlord"/>
                <Field field="ancestralWeapons" label="Ancestral weapons"/>
            </ItemDetails>
        );
        return(
            <RowBlock left={itemList} right={itemDetails}/>
        );
    }
}