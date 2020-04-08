const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
    case 'MENU_LOADED':
        return {
            ...state,
            menu: action.payload,
            loading: false,
            error: false
        };
    case 'MENU_REQUESTED':
        return {
            ...state,
            loading: true,
            error: false
        };
    case 'MENU_ERROR':
        return {
            ...state,
            loading: false,
            error: true
        };
    case 'ITEM_ADD_TO_CART': {
        const id = action.payload;
        const existIndex = state.items.findIndex(item => item.id === id);
        if (existIndex >= 0) {
            const itemInState = state.items[existIndex];
            const updatedItem = {...itemInState, quantity: itemInState.quantity + 1};
            return {
                ...state,
                items: [
                    ...state.items.slice(0, existIndex), 
                    updatedItem, 
                    ...state.items.slice(existIndex + 1)
                ],
                totalPrice: state.totalPrice + itemInState.price
            };
        }
        const item = state.menu.find(item => item.id === id);
        const newItem = {
            title: item.title,
            price: item.price,
            url: item.url,
            id: item.id,
            quantity: 1
        };
        return {
            ...state,
            items: [
                ...state.items,
                newItem
            ],
            totalPrice: state.totalPrice + newItem.price
        };
    }
    case 'ITEM_DELETE_FROM_CART': {
        const idx = action.payload;
        const itemIndex = state.items.findIndex(item => item.id === idx);
        const itemInState = state.items[itemIndex];
        if (itemInState.quantity > 1) {
            const updatedItem = {...itemInState, quantity: itemInState.quantity - 1};
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex), 
                    updatedItem, 
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - itemInState.price
            };
        }
        return {
            ...state,
            items: [
                ...state.items.slice(0, itemIndex),
                ...state.items.slice(itemIndex + 1)
            ],
            totalPrice: state.totalPrice - itemInState.price
        };
    }
    case 'CART_PLACE_ORDER': {
        return {
            ...state,
            items: [],
            totalPrice: 0
        };
    }
    default:
        return state;
    }
};

export default reducer;