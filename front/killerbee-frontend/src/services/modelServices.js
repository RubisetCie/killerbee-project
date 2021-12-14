import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

export async function postModel(model){// url+'/' et bsn d'un param (body)
    try{
        const response = await axios.post(baseUrl+"model/",
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

export async function getModels(){// url+'/'
    try{
        const response = await axios.get(baseUrl+"model/")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
    }
}
export async function getByIdMdels(id){// url+'/:id'
    try{
        const response = await axios.get(baseUrl+"model/"+id)
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryModels(query){// url+'/query' et bsn d'un param (body)
    try{
        const response = await axios.get(baseUrl+"model/query",{
            query: query
        })
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function putByIdModel(id, model){// url+'/:id' et bsn d'un param (body)
    try{
        const response = await axios.put(baseUrl+"model/"+id,
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
export async function deleteModel(id){// url+'/:id'
    try{
        const response = await axios.delete(baseUrl+"model/"+id,
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