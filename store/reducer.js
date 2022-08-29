import {LOGIN} from './action'

const initialState = {
    email: [],
    password: []
}



const authenticReducer =(state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return{
                email: action.email,
                password: action.password,
            }
    }
    return{state}
}

export default authenticReducer;