import axios from 'axios';
//const baseUrl = process.env.URL_API1
const baseUrl =  "http://localhost:3000/"
//const baseUrl = "http://10.10.10.2:3000/"
export async function postModel(model, accessToken){// url+'/' et bsn d'un param (body)
    try{
        console.log(model)
        const request = {
            name: model.name,
            description: model.description,
            reference: model.reference,
            variety: model.variety,
            color: model.color,
            price: model.price,
            dimensions: model.dimensions,
            mass: model.mass,
            lift: model.lift,
            needs: model.needs
        }

        console.log("postModel")
        console.log(request)
        console.log("postModel")
        console.log(typeof(request))
        const header = {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
        console.log("Header")
        console.log(header)
        const response = await axios.post(baseUrl+"model/",request,
        {
            headers: header
        })
        
        console.log("postModel")
        console.log(response.status)
        return response.status
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}

export async function getModels(accessToken){// url+'/'
    try{
        const response = await axios.get(baseUrl+"model/", {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getModels")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
    }
}
export async function getByIdModels(id, accessToken){// url+'/:id'
    try{
        console.log(id)
        const response = await axios.get(baseUrl+"model/"+id, {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getByIdModels")
        console.log(response.status)
        console.log(response.data)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryModels(query, accessToken){// url+'/query' et bsn d'un param (body)
    try{
        const header = {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
        console.log("Header - getQueryModels")
        console.log(header) 
        const request = {
            query: query
        } 
        console.log("Request - getQueryModels")
        console.log(request)
        console.log("URL")
        console.log(baseUrl+"model/query")
        const response = await axios.get(baseUrl+"model/query",
        request,
        {
            headers: header
        })
        console.log("getQueryModels")
        console.log(response.status)
        console.log(response.data)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function putByIdModel(id, model, accessToken){// url+'/:id' et bsn d'un param (body)
    try{
        const response = await axios.put(baseUrl+"model/"+id,
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        },
        {
            name: model.name,
            description: model.description,
            reference: model.reference,
            variety: model.variety,
            color: model.color,
            price: model.price,
            dimensions: model.dimensions,
            mass: model.mass,
            lift: model.lift,
            needs: model.needs
        })
        console.log("putByIdModel")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function deleteModel(id, accessToken){// url+'/:id'
    try{
        const response = await axios.delete(baseUrl+"model/"+id,
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("deleteModel")
        console.log(response.status)
        return response.status
      } catch (e) {
          console.warn(e)
          return e.response.status
      }
}