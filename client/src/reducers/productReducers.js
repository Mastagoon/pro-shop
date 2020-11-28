import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { products: [] , loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { products: action.payload, loading: false }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.playload }
        default:
            return state
    }
}