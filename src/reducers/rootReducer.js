const initState = {
    user: {
        name: "Najim Rizky",
        email: "najimajim1@gmail.com"
    }
}

const rootReducer = (state = initState, action) => {
    if(action.type === "SET_USER"){
        return {
            ...state,
            user: action.user
        }
    }
    return state;
}

export default rootReducer