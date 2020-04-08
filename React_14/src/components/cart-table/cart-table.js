import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deleteFromCart, placeOrder} from '../../actions';
import WithRestoService from '../hoc';
import './cart-table.scss';

class CartTable extends Component {
    onPlaceOrder = () =>  {
        const {RestoService, items, placeOrder} = this.props;
        RestoService.placeOrder(items)
            .then(() => placeOrder());
    }

    render() {  
        const {items, deleteFromCart} = this.props;
        return (
            <>
                <div className="cart__title">Ваш заказ:</div>
                <div className="cart__list">
                    {
                        items.map(item => {
                            const {title, price, url, id, quantity} = item;
                            return (
                                <div key={id} className="cart__item">
                                    <img src={url} className="cart__item-img" alt={title}></img>
                                    <div className="cart__item-title">{title}</div>
                                    <div className="cart__item-price">{quantity} X {price}$ = {quantity * price}$</div>
                                    <div className="cart__close" onClick={() => deleteFromCart(id)}>&times;</div>
                                </div>
                            );
                        })
                    }
                    <button className="menu__btn" onClick={this.onPlaceOrder}>Place on order</button>
                </div>
                <div>
                    
                </div>
            </>
        );
    }
}

const mapStateToProps = ({items}) => {
    return {
        items
    };
};

const mapDispatchToProps = {
    deleteFromCart,
    placeOrder
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));