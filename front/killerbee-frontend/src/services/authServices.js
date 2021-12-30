import axios from 'axios';
const baseUrl =  "http://localhost:3000/"
//const baseUrl="http://10.10.10.2:3000/"
//CONNECTION OF USER
export async function login(username, password) {
  try {
        console.log(username)
        console.log(password)
        console.log(baseUrl+"login/")
        const response = await axios.post(baseUrl+"login/", {
          username: username,
          password: password
        })
        console.log(login)
        console.log(response.status)
        const res = {status: response.status, body: response.data}
        return res
    } catch (e) {
        console.warn(e)
        return e.response.data
    }
}

//DECONNECTION OF USER
export async function logout(token, refreshtoken) {
  try {
        const response = await axios.post(baseUrl+"logout/", {
          token: token,
          refreshtoken: refreshtoken
        })
        console.log('logout')
        console.log(response.status)
        return response.data
    } catch (e) {
        console.warn(e)
        return e.response.data
    }
}