import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

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

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { product: action.payload, loading: false }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.playload }
        default:
            return state
    }
}