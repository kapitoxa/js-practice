import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';

import GotService from '../../services/gotService.js';

describe('Testing <ItemList/>', () => {
    const service = new GotService();
    const list = mount(<ItemList 
        getData={service.getAllHouses} 
        renderItem={({name}) => name}/>);
    it('Click on item list must rerender all list in 1 instance', () => {
        list.setState({
            itemList: [
                {name: 'dasd', id: 1}, 
                {name: 'svcxed', id: 2}
            ]
        });
        list.find('.list-group-item:first-child').simulate('click');
        expect(list.find('ul')).toHaveLength(1);
    });
});