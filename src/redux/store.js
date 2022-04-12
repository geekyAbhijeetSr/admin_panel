import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import categoryReducer from './features/category-slice'
import attributeReducer from './features/attribute-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        attribute: attributeReducer
    },
})

export default store