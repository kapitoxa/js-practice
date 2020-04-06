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
                {label: 'Going to learn React', important: false, like: false, id: 'ce07558d-f23b-409f-9d76-0090c70058c5'},
                {label: 'That is so good', important: false, like: false, id: 'a5f46f21-7fd1-45e6-a6aa-136ec5d9e8d2'},
                {label: 'I need break...', important: false, like: false, id: '2abcec93-c422-4a6d-9f58-97765a46785e'}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
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
            like: false,
            id: uuidv4()
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            };
        });
    }
    onToggleImportant(id) {
        this.updateItem(id, {toggleImportant: true});
    }
    onToggleLiked(id) {
        this.updateItem(id, {toggleLike: true});
    }
    updateItem(id, {toggleLike = false, toggleImportant = false}) {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const old = data[index];
            const newItem = {...old};
            if (toggleLike) {
                newItem.like = !old.like;
            }
            if (toggleImportant) {
                newItem.important = !old.important;
            }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            };
        });
    }
    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => item.label.indexOf(term) >= 0);
    }
    onUpdateSearch(term) {
        this.setState({term});
    }
    filterPosts(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        }
        return items;
    }
    onFilterSelect(filter) {
        this.setState({filter});
    }
    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);
        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts} 
                    onDelete={this.deleteItem} 
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm 
                    onAdd={this.addItem}/>
            </div>
        );
    }
}