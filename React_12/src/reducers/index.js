const initState = {
    menu: []
};

const reducer = (state = initState, action) => {
    switch(action.type) {
    case 'MENU_LOADED':
        return {
            menu: action.payload
        };
    default:
        return state;
    }
};

export default reducer;