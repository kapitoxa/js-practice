import React, {Component} from 'react';
import {connect} from 'react-redux';

import {menuLoaded, menuRequested, menuError} from '../../actions';
import WithRestoService from '../hoc';
import Error from '../error';
import Spinner from '../spinner';
import './item-page.css';

class ItemPage extends Component {
    componentDidMount() {
        if (this.props.menuItems.length === 0) {
            const {RestoService, menuRequested, menuLoaded} = this.props;
            menuRequested();
            RestoService.getMenuItems()
                .then(res => menuLoaded(res))
                .catch(() => menuError());
        }
    }

    render() {
        const {menuItems, loading, error, match} = this.props;
        if (error) {
            return <Error/>;
        }
        if (loading) {
            return <Spinner/>;
        }
        const item = menuItems.find(elem => +elem.id === +match.params.id);
        if (!item) {
            return <></>;
        }
        const {title, price, url, category} = item;
        return (
            <div className="item_page">
                <div className="menu__item item_block">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category: <span>{category}</span></div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    <button className="menu__btn">Add to cart</button>
                    <span className={`menu__category_Img ${category}`}></span>
                </div>
            </div>
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
    menuError
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));