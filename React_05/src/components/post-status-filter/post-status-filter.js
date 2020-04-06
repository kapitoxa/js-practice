import React, {Component} from 'react';
import {Button} from 'reactstrap';

import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ];
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;

            let options = {
                onClick: () => onFilterSelect(name),
                color: 'info',
                outline: filter != name
            };

            return (
                <Button key={name} {...options}>{label}</Button>
            );
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}