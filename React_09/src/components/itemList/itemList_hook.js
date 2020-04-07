import React, {useState, useEffect} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

import Spinner from '../spinner';

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            });
    });

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <ListGroupItem 
                    key={id}
                    tag="button" 
                    onClick={() => onItemSelected(id)} 
                    action>
                    {label}
                </ListGroupItem>
            );
        }); 
    }


    if (!itemList) {
        return <Spinner/>;
    }
    const items = renderItems(itemList);
    return (
        <ListGroup>
            {items}
        </ListGroup>
    );

}

export default ItemList;