import React, {Component} from 'react';
import {connect} from 'react-redux';

import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';
import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        const{RestoService, menuLoaded, menuRequested, menuError} = this.props;
        menuRequested();
        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(() => menuError());
    }

    render() {
        const {menuItems, loading, error, addToCart} = this.props;
        if (error) {
            return <Error/>;
        }
        if (loading) {
            return <Spinner/>;
        }
        const items = menuItems.map(menuItem => {
            return <MenuListItem 
                key={menuItem.id}
                menuItem={menuItem}
                onAddToCart={() => addToCart(menuItem.id)}/>;
        });
        return (
            <View items={items}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    };
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addToCart
};

const View = ({items}) => {
    return(
        <ul className="menu__list">
            {items}
        </ul>
    );
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));