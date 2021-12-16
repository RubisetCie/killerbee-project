import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

//CONNECTION OF USER
export async function login(username, password) {
  try {
        const response = await axios.post(baseUrl+"login/", {
          username: username,
          password: password
        })
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
        console.log(token)
        const response = await axios.post(baseUrl+"logout/", {
          token: token,
          refreshtoken: refreshtoken
        })
        console.log(response.status)
        return response.data
    } catch (e) {
        console.warn(e)
        return e.response.data
    }
}