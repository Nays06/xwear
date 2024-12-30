import { addManyProductsAction } from "./productsReducer"

export const fetchCustomers = () => {
    return function(dispatch){
        fetch("https://6765722d52b2a7619f5f93a3.mockapi.io/xwear/products")
        .then(response => response.json())
        .then(json => dispatch(addManyProductsAction(json)))
        .catch(err => console.log(err)
        )
    }
}