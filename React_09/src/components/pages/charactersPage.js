import React, {Component} from 'react';

import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class CharactersPage extends Component {
    state = {
        selectedChar: 41,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedChar: id,
            error: false
        });
    }

    render() {
        const {gotService} = this.props;
        const {error, selectedChar} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        );
        const charDetails = (
            <ItemDetails 
                itemId={selectedChar}
                getItem={gotService.getCharacter}>
                <Field field="gender" label="Gender"/>
                <Field field="born" label="Born"/>
                <Field field="died" label="Died"/>
                <Field field="culture" label="Culture"/>
            </ItemDetails>
        );
        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}