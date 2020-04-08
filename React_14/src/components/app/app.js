import React from 'react';
import {Route} from 'react-router-dom';

import {MainPage, CartPage, ItemPage} from '../pages';
import AppHeader from '../app-header';
import Background from './food-bg.jpg';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
            <Route exact path="/" component={MainPage}/>
            <Route path="/cart" component={CartPage}/>
            <Route path="/:id" component={ItemPage}/>
        </div>
    );
};

export default App;