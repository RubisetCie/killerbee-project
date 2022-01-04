import axios from 'axios';
//const baseUrl = process.env.URL_API2
const baseUrl =  "http://localhost:3000/"
//const baseUrl ="http://10.10.10.2:3001/"
export async function getAllIngredients(accessToken){ // url+'/'
    try{
        const response = await axios.get(baseUrl+"ingredient/", {
            headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        console.log("getAllIngredients")
        console.log(response.status)
        console.log(response.data)
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
        console.log(response.data)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}
export async function getQueryIngredients(query, accessToken){ // url+'/query'
    try{
        console.log('Token: '+ accessToken)
        console.log('Query: '+ query)
        console.log('Header')
        const header = {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
        console.log(header) 
        const request = {
            query: query
        }
        console.log(request)           
        const response = await axios.get(baseUrl+"ingredient/query", request,
        {
            headers: header
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
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
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
export async function deleteIngredient(id, accessToken){ // url+'/:id'
    try{
        const response = await axios.delete(baseUrl+"ingredient/"+id,
        {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
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
        console.log(ingredient)
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
            headers: { 
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
            }
        })
        console.log("postIngredient")
        console.log(response.status)
        return response.data
      } catch (e) {
          console.warn(e)
          return e.response.data
      }
}