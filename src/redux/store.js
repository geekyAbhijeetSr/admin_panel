import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import categoryReducer from './features/category-slice'
import attributeReducer from './features/attribute-slice'
import productReducer from './features/product-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        attribute: attributeReducer,
        product: productReducer,
    },
})

export default store