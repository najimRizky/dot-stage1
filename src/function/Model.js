// import userData from "./../database/user.json"
// import * as fs from 'fs';


const doLogin = (email, password) => {
    const userData = JSON.parse(window.localStorage.getItem("user"))
    if(userData !== null){
        const activeUser = userData.find(user => user.email === email)
        if(activeUser && activeUser.password === password) {
            return {name: activeUser.name, email: activeUser.email}
        }else  
            return false
    }else{
        return false
    }    
}

const doRegister =  (name, email, password) => {
    const userData = JSON.parse(window.localStorage.getItem("user"))
    if(userData !== null){
        if(!userData.find(user => user.email === email)){
            const newUserData = [...userData, {
                name: name,
                email: email,
                password: password
            }]
            window.localStorage.setItem("user", JSON.stringify(newUserData))
            return true
        }else{
            return false
        }
    }else{
        const newUserData = [{
            name: name,
            email: email,
            password: password
        }]
        window.localStorage.setItem("user", JSON.stringify(newUserData))
        return true
    }
    
}
 
export {doLogin, doRegister};