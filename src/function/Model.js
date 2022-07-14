import userData from "./../database/user.json"

const doLogin = (email, password) => {
    const index = userData.findIndex(user => user.email === email)
    if(index !== -1 && userData[index].password === password){
        console.log("berhasil")
    }else console.log("gagal")
}
 
export {doLogin};