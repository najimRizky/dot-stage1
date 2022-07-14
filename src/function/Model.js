import userData from "./../database/user.json"
// import * as fs from 'fs';


const doLogin = (email, password) => {
    const activeUser = userData.find(user => user.email === email)
    if(activeUser && activeUser.password === password) {
        return {name: activeUser.name, email: activeUser.email}
    }else  
        return false
    
    
}

// const doRegister =  (name, email, password) => {
//     const newUserData = userData.push({
//         name: name,
//         email: email,
//         password: password
//     })
// }
 
export {doLogin};