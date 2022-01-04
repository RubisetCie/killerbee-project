import axios from 'axios';
//const baseUrl = process.env.URL_API3
const baseUrl =  "http://localhost:3000/"
//const baseUrl ="http://10.10.10.2:3002/"
export async function postMethod(method, accessToken){
    try{
        const requestBody = {
            name: method.name,
            description: method.description,
            model: method.modelID,
            steps: [method.steps]
        }
        console.log("MethodService")
        console.log(requestBody)
        const header = {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
        const response = await axios.post(baseUrl+"method/",
        requestBody,
        {
            headers: header
        })
        console.log("postMethod")
        console.log(response.status)
        return response.status
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}

export async function getMethods(accessToken){// url+'/'
    try{
        const response = await axios.get(baseUrl+"method/", 
        {
            headers: { // Faut-il rajouter qqch?
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getMethods")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
    }
}
export async function getByIdMethods(id, accessToken){// url+'/:id'
    try{
        const response = await axios.get(baseUrl+"method/"+id, 
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getByIdMethods")
        console.log(response.status)
        console.log(response.data)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryMethods(query, accessToken){// url+'/query'
    try{
        const response = await axios.get(baseUrl+"method/query",{
            query: query
        },
        {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
            }
        })
        console.log("getQueryMethods")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function putMethod(id, method, accessToken){// url+'/:id'
    try{
        const response = await axios.put(baseUrl+"method/"+id,
        {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
            }
        },
        {
            name: method.name,
            description: method.description,
            model: method.modelId,
            steps: method.steps
        })
        console.log("putMethod")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function deleteMethod(id, accessToken){// url+'/:id'
    try{
        const response = await axios.delete(baseUrl+"method/"+id,
        {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
            }
        })
        console.log("deleteMethod")
        console.log(response.status)
        return response.status
      } catch (e) {
          console.warn(e)
          return e.response.status
      }
}