import React, {Component} from 'react';
import {v4 as uuidv4} from 'uuid';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn React', important: true, id: 'ce07558d-f23b-409f-9d76-0090c70058c5'},
                {label: 'That is so good', important: false, id: 'a5f46f21-7fd1-45e6-a6aa-136ec5d9e8d2'},
                {label: 'I need break...', important: false, id: '2abcec93-c422-4a6d-9f58-97765a46785e'}
            ]
        };
        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    deleteItem(id) {
        console.log(id);
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data : newArr
            };
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            import: false,
            id: uuidv4()
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            };
        });
    }

    render() {
        const {data} = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList 
                    posts={data} 
                    onDelete={this.deleteItem} />
                <PostAddForm 
                    onAdd={this.addItem}/>
            </div>
        );
    }
}