import Vue from 'vue'
import Vuex from 'vuex'
import { boolean } from 'yup'
import { login, logout } from '../services/authServices'
import { getAllIngredients,getByIdIngredients,getQueryIngredients, postIngredient, deleteIngredient} from '../services/ingredientsServices'
import { getMethods, getByIdMethods, getQueryMethods, deleteMethod} from '../services/methodsService'
import { getModels, getByIdModels, getQueryModels, postModel, deleteModel} from '../services/modelsServices'
Vue.use(Vuex)

require("dotenv").config();

export default new Vuex.Store({
  state: {    
    session: {
      accessToken: String,
      refreshToken: String,
      username: String,
      password: String,
      id: localStorage.id,
      role: String
    },
    models:[],
    model:{
      name: String,
      description: String,
      variety: String,
      color: Object,
      price: Number,
      dimensions: Object,
      mass: Number,
      lift: Number,
      needs:[]
    },
    modelChoice:[],
    modelsQuery:[],
    modelId:{},
    modelSelected: boolean,
    ingredientsTitle:{
      name: "name",
      description: "description",
      brand: "brand",
      type: "type",
      color: "color",
      price: "price",
      density: "density",
      young: "young"
    },
    ingredient:{
      name: String,
      description: String,
      brand: String,
      type: String,
      color: Object,
      price: Number,
      density: Number,
      young: Number
    },
    ingredients:[],
    ingredientsQuery:[],
    ingredientId:[],
    ingerdientSelected: boolean,  
    methods:[],
    method:{
      name: String,
      description: String,
      modelId: Object,
      steps:[]
    },
    methodsQuery:[],
    methodId: [],
    methodsTitle:{
      name: "name",
      description: "description",
      modelId: "ID du modèle",
      steps:"étape du processus"
    },
    fabricationsTitle:{
      name: "name",
      description: "description",
      brand: "brand",
      type: "type",
      color: "color",
      price: "price",
      density: "density",
      young: "young",
      dosing: "dosing", 
    },
    account:[],
    insertion: boolean, 
    deleteSuccess: false
  },
  getters:{
    account: state => state.account,
    models: state => state.models,
    model: state => state.model,
    modelChoice: state => state.modelChoice,
    modelsQuery: state => state.modelsQuery,
    ingredients: state => state.ingredients,
    ingredient: state => state.ingredient,
    ingredientsQuery: state => state.ingredientsQuery,
    methods: state => state.methods,
    method: state => state.method,
    methodsQuery: state => state.methodsQuery,
    step: state => state.step,
    deleteSuccess: state => state.deleteSuccess
  },
  mutations: {
    // SESSION - Connection of the user
    LOCALSTORAGE(state, res) {
        //LocalStorage
        localStorage.accessToken = res.accessToken
        localStorage.refreshtoken = res.refreshToken
        //localStorage.role = res.role
        localStorage.username = state.username
        localStorage.password = state.password

        console.log("LocalStorage: \n"+ JSON.stringify(localStorage))

        //Vuex Store
        //state.session.id = res.id
        state.session.accessToken = res.accessToken
        //state.session.role = res.role
        state.session.refreshtoken = res.refreshToken
        
        console.log("Session: \n"+ JSON.stringify(state.session))
    },
    //ACCOUNT - get role of user
    /*GETINFOACCOUNT(state, payload) {
      state.account = payload.data

      console.log('Account: \n'+ state.account)

    },*/
    //ACCOUNT - disconnect the user
    LOGOUT(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("pb_exceptions");
      localStorage.removeItem("lastUpdatedAt");
      localStorage.removeItem("pb_user_activity");
      localStorage.removeItem("loglevel:webpack-dev-server");
      localStorage.removeItem("pb_forms");

      state.session.id = null;
      state.session.token = null;
      state.session.refreshtoken = null;
      state.session.role = null;
      state.session.username = null;
      state.session.password = null;
      
    },
    
    //MODEL
    GETALLMODELS(state, payload){
      state.models = payload.models
      state.deleteSuccess = false
    },
    GETBYIDMODEL(state, payload){
      state.modelId = payload.model
    },
    GETQUERYMODEL(state, payload){
      state.modelsQuery = payload
    },
    POSTMODEL(state, payload){
      state.insertion = false
      state.insertion = payload
    },
    DELETEMODEL(state){
      state.deleteSuccess = true
    },
    // INGREDIENT
    GETALLINGREDIENTS(state, payload){
      state.ingredients = payload.ingredients
      state.deleteSuccess = false
    },
    GETBYIDINGREDIENT(state, payload){
      state.ingredientId = payload
    },
    GETQUERYINGREDIENT(state, payload){
      state.ingredientsQuery = payload
    },
    POSTINGREDIENT(state, payload){
      state.insertion = false
      state.insertion = payload
    },
    DELETEINGREDIENT(state){
      state.deleteSuccess = true
    },
    // METHOD
    GETALLMETHODS(state, payload){
      state.methods = payload.methods
      state.deleteSuccess = false
    },
    GETBYIDMETHOD(state, payload){
      state.methodId = payload
    },
    GETQUERYMETHOD(state, payload){
      state.methodsQuery = payload
    },
    DELETEMETHOD(state){
      state.deleteSuccess = true
    },
    //STEP  
  },
  actions: {
    // SESSION - Connexion of the user
    login({ commit }, payload) { // ATTENTION, on peut get response.statut pour voir les succès ou non de la connexion
      commit('LOGOUT')
      try {
        return login(payload.username, payload.password).then(res => {
          this.state.session.username = payload.username
          this.state.session.password = payload.password
          if(res.status == 200){
            commit('LOCALSTORAGE', res.body)
          }
          else{
            console.log(" Erreur d'identifiant ou de mot de passe.")
          }
            return res.status
        })
      }
      catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    //ACCOUNT - get the information of user
    /*
    getInfoAccount({ commit }) {
      try {
        if (this.state.session.id) {
          return getInfoAccount(this.state.session.id).then(res => {
            commit('GETINFOACCOUNT', res)
            return res.success
          })
        }
      }
      catch (err) {
        console.warn(err)
      }
    },
    */
    //ACCOUNT - Disconnect the current acount
    logout({ commit }) {
      try {
        return logout(this.state.session.accessToken, this.state.session.refreshToken).then(res => {
            commit('LOGOUT')
            return res.success
        })
      }
      catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
  //MODELS
        /// GET
    getAllModels({ commit }){
      try{
        return getModels(this.state.session.accessToken).then(res => {
          console.log(res)
          commit('GETALLMODELS', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getByIdModel({ commit }, payload){
      try{
        return getByIdModels(payload.id, this.state.session.accessToken).then(res =>{
          commit('GETBYIDMODEL', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getQueryModel({ commit }, query){
      try{
        return getQueryModels(query, this.state.session.accessToken).then(res =>{
          commit('GETQUERYMODEL', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    //DELETE
    deleteModel({commit},payload){
      try{
        console.log("Store:")
        console.log(payload.id)
        return deleteModel(payload.id,this.state.session.accessToken).then(res =>{
          commit('DELETEMODEL', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
        ///POST
    postModel({commit},payload){
      try{
        console.log("Store: postModel");
        console.log(payload)
        postModel(payload.newModel, this.state.session.accessToken).then(res =>{
            if(res == 200){
              commit("POSTMODEL", res)
          }
          else{
            console.log("Tentative de POST MODEL échoué")
          }
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
        ///PUT

        ///DELETE
    // INGREDIENTS
    getAllIngredients({ commit }){
      try{
        return getAllIngredients(this.state.session.accessToken).then(res => {
          console.log(res)
          commit('GETALLINGREDIENTS', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getByIdIngredient({ commit }, payload){
      try{
        return getByIdIngredients(payload.id, this.state.session.accessToken).then(res =>{
          console.log(res)
          commit('GETBYIDINGREDIENT', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getQueryIngredients({ commit }, query){
      try{
        console.log('je suis passé dans index.js')
        
        return getQueryIngredients(query, this.state.session.accessToken).then(res =>{
          commit('GETQUERYINGREDIENT', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    postIngredient({commit},payload){
      try{
        console.log("Store: postModel");
        console.log(payload)
        postIngredient(payload.newIngredient, this.state.session.accessToken).then(res =>{
            if(res == 200){
              console.log(res)
              commit("POSTINGREDIENT", res)
          }
          else{
            console.log("Tentative de POST MODEL échoué")
          }
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    deleteIngredient({commit}, payload){
      try{
        console.log("Store:")
        console.log(payload.id)
        return deleteIngredient(payload.id,this.state.session.accessToken).then(res =>{
          commit('DELETEINGREDIENT', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    //METHODS
    getAllMethods({ commit }){
      try{
        return getMethods(this.state.session.accessToken).then(res => {
          console.log(res)
          commit('GETALLMETHODS', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getByIdMethod({ commit }, payload){
      try{
        return getByIdMethods(payload.id, this.state.session.accessToken).then(res =>{
          commit('GETBYIDMETHOD', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getQueryMethod({ commit }, query){
      try{
        return getQueryMethods(query, this.state.session.accessToken).then(res =>{
          commit('GETQUERYMETHOD', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
    }
  },
  deleteMethod({commit}, payload){
    try{
      console.log("Store:")
      console.log(payload.id)
      return deleteMethod(payload.id,this.state.session.accessToken).then(res =>{
        commit('DELETEMETHOD', res);
      })
    }catch (err) {
      console.warn(err);
      this.$router.push('Login')
    }
  }
}, 
  modules: {
  }
})
