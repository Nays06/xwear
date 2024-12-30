const defaultState = {
  products: [],
};

const ADD_MANY_PRODUCTS = "ADD_MANY_PRODUCTS";
const GET_CATEGORY_PRODUCTS = "GET_CATEGORY_PRODUCTS";

export const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MANY_PRODUCTS:
      return { ...state, products: [...action.payload] };

    case GET_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: state.products.find((product) => product === action.payload),
      };
    default:
      return state;
  }
};

export const addManyProductsAction = (payload) => ({
  type: ADD_MANY_PRODUCTS,
  payload,
});
