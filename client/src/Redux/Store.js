import {configureStore} from  '@reduxjs/toolkit'
import userSlicereducer from './Username'


export default configureStore ({
    reducer:{userData:userSlicereducer}
})      