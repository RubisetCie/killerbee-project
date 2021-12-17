import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

export async function postModel(model, accessToken){// url+'/' et bsn d'un param (body)
    try{
        const response = await axios.post(baseUrl+"model/",
        {
            headers: { // Faut-il rajouter qqch?
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
        const response = await axios.getById(baseUrl+"model/"+id, {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getByIdModels")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryModels(query, accessToken){// url+'/query' et bsn d'un param (body)
    try{
        const response = await axios.getQuery(baseUrl+"model/query",
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        },
        {
            query: query
        })
        console.log("getQueryModels")
        console.log(response.status)
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