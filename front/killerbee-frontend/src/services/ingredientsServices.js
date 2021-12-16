import axios from 'axios';
const baseUrl = 'http://localhost:3000/'

export async function getAllIngredients(accessToken){ // url+'/'
    try{
        const response = await axios.get(baseUrl+"ingredient/", {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getAllIngredients")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}

export async function getByIdIngredients(id, accessToken){ // url+'/:id'
    try{
        const response = await axios.get(baseUrl+"ingredient/"+id,{
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getByIdIngredients")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryIngredients(payload, accessToken){ // url+'/query'
    try{
        console.log('Token: '+ accessToken)
        console.log('Query: '+ payload)
        console.log('Typeof Query: '+typeof(payload))
        console.log(payload)           
        const response = await axios.get(baseUrl+"ingredient/query", 
        {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        },{
            query: JSON.stringify(payload),
        })
        console.log("getQueryIngredients")
        console.log(response.status)
        console.log("Response Data: ")
        console.log(response.data)
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
            headers: {
              Authorization: "Bearer " + accessToken
            }
        },
        {
            name: ingredient.name,
            description: ingredient.description,
            brand: ingredient.brand,
            type: ingredient.type,
            color: ingredient.color,
            price: ingredient.price,
            density: ingredient.density,
            young: ingredient.young
        })
        console.log("putByIdIngredient")
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
        console.log("deleteByIdIngredient")
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
            headers: { // Faut-il rajouter qqch?
              Authorization: "Bearer " + accessToken
            }
        },
        {
            name: ingredient.name,
            description: ingredient.description,
            brand: ingredient.brand,
            type: ingredient.type,
            color: ingredient.color,
            price: ingredient.price,
            density: ingredient.density,
            young: ingredient.young
        })
        console.log("postIngredient")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}