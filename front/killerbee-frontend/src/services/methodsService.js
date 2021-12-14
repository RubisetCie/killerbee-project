import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

export async function postMethod(method){
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
              Authorization: "Bearer " + token
            }
        })
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
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function putMethod(id, method){// url+'/:id'
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
              Authorization: "Bearer " + token
            }
        })
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function deleteMethod(id){// url+'/:id'
    try{
        const response = await axios.delete(baseUrl+"method/"+id,
        {
            headers: {
              Authorization: "Bearer " + token
            }
        })
        console.log(response.status)
        return response.status
      } catch (e) {
          console.warn(e)
          return e.response.status
      }
}