
import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';
import { LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        idUser: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log('check action: ', action)
            return {
                ...state,
                account: {
                    access_token: action?.payload?.result?.accessToken,
                    refresh_token: action?.payload?.result?.refreshtoken,
                    email: action?.payload?.result?.email,
                    phone: action?.payload?.result?.phone,
                    fullName: action?.payload?.result?.full_name,
                    role: action?.payload?.result?.role,
                    idUser: action?.payload?.result?.user_id,
                },
                isAuthenticated: true
            };
        case LOGOUT_SUCCESS:
            console.log('check action: ', action)
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: ''
                },
                isAuthenticated: false
            };


        default: return state;
    }
};

export default userReducer;