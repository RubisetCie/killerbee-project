import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

export async function getAllIngredients(){ // url+'/'
    try{
        const response = await axios.get(baseUrl+"ingredient/")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}

export async function getByIdIngredients(id){ // url+'/:id'
    try{
        const response = await axios.get(baseUrl+"ingredient/"+id)
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryIngredients(query){ // url+'/query'
    try{
        const response = await axios.get(baseUrl+"ingredient/query",{
            query: query
        })
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function putByIdIngredient(id, accessToken, ingredient){ // url+'/:id'
    try{
        const response = await axios.put(baseUrl+"ingredient/"+id,
        {
            name: ingredient.name,
            description: ingredient.description,
            brand: ingredient.brand,
            type: ingredient.type,
            color: ingredient.color,
            price: ingredient.price,
            density: ingredient.density,
            young: ingredient.young
        },
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function deleteByIdIngredient(id, accessToken){ // url+'/:id'
    try{
        const response = await axios.delete(baseUrl+"ingredient/"+id,
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log(response.status)
        return response.status
      } catch (e) {
          console.warn(e)
          return e.response.status
      }
}
export async function postIngredient(ingredient, accessToken){ // url+'/'
    try{
        const response = await axios.post(baseUrl+"ingredient/",
        {
            name: ingredient.name,
            description: ingredient.description,
            brand: ingredient.brand,
            type: ingredient.type,
            color: ingredient.color,
            price: ingredient.price,
            density: ingredient.density,
            young: ingredient.young
        },
        {
            headers: { // Faut-il rajouter qqch?
              Authorization: "Bearer " + accessToken
            }
        })
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}