import React from 'react';
import {Route} from 'react-router-dom';

import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import WithRestoService from '../hoc';
import Background from './food-bg.jpg';

const App = ({RestoService}) => {
    RestoService.getMenuItems()
        .then(menu => console.log(menu))
        .catch(error => console.log('Ошибка получения данных', error));
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <Route exact path="/" component={MainPage}/>
            <Route path="/cart" component={CartPage}/>
        </div>
    );
};

export default WithRestoService()(App);