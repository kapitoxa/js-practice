import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

import Term from '../term';

const CharacterInfo = ({char, headerPrefix = ''}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>{`${headerPrefix}${name}`}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Gender</Term>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Born</Term>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Died</Term>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Culture</Term>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    );
};

export default CharacterInfo;