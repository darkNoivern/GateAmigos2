const InitialOBJ = {
    loggedin: false,
    username: "",
    avatarid: "",
    email: "",
};

let InitialState;
if(localStorage.getItem("jekyll-os") === null){
    InitialState = InitialOBJ;
}
else{
    InitialState = JSON.parse(localStorage.getItem("jekyll-os"))
}

// console.log(InitialState)

const rootReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'SIGNIN':
            let newstate = state;
            newstate.loggedin = true;
            newstate.username = action.payload.username;
            newstate.avatarid = action.payload.avatarid;
            newstate.email = action.payload.email;
            state = newstate;
            localStorage.setItem("jekyll-os", JSON.stringify(state));  
            console.log(state)
            return state;
        case 'LOGOUT':
            state.loggedin = false;
            state.username = "";
            state.avatarid = "";
            state.email = "";
            localStorage.setItem("jekyll-os", JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default rootReducer