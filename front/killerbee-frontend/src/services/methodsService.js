import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

export async function postMethod(method, accessToken){
    try{
        const response = await axios.post(baseUrl+"method/",
        {
            name: method.name,
            description: method.description,
            model: method.modelId,
            steps: method.steps
        },
        {
            headers: { // Faut-il rajouter qqch?
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("postMethod")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}

export async function getMethods(){// url+'/'
    try{
        const response = await axios.get(baseUrl+"method/")
        console.log("getMethods")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
    }
}
export async function getByIdMethods(id){// url+'/:id'
    try{
        const response = await axios.get(baseUrl+"method/"+id)
        console.log("getByIdMethods")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryMethods(query){// url+'/query'
    try{
        const response = await axios.get(baseUrl+"method/query",{
            query: query
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
            name: method.name,
            description: method.description,
            model: method.modelId,
            steps: method.steps
        },
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
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
              Authorization: "Bearer " + accessToken
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