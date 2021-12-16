import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '../services/authServices'
import { getAllIngredients,getByIdIngredients,getQueryIngredients} from '../services/ingredientsServices'
import { getMethods, getByIdMethods, getQueryMethods} from '../services/methodsService'
import { getModels, getByIdModels, getQueryModels} from '../services/modelsServices'
Vue.use(Vuex)

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
    methods:[],
    method:{
      name: String,
      description: String,
      modelId: Object,
      steps:[]
    },
    account:[]
  },
  getters:{
    account: state => state.account,
    models: state => state.models,
    model: state => state.model,
    ingredients: state => state.ingredients,
    ingredient: state => state.ingredient,
    methods: state => state.methods,
    method: state => state.method,
    step: state => state.step
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
    },
    GETBYIDMODEL(state, payload){
      state.model = payload
    },
    GETQUERYMODEL(state, payload){
      state.model = payload
    },
    // INGREDIENT
    GETALLINGREDIENTS(state, payload){
      state.ingredients = payload.ingredients
      console.log(state.ingredients)
    },
    GETBYIDINGREDIENT(state, payload){
      state.ingredient = payload
    },
    GETQUERYINGREDIENT(state, payload){
      state.ingredient = payload
    },
    // METHOD
    GETALLMETHODS(state, payload){
      state.methods = payload
    },
    GETBYIDMETHOD(state, payload){
      state.method = payload
    },
    GETQUERYMETHOD(state, payload){
      state.method = payload
    }
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
    *//*
    //ACCOUNT - Disconnect the current acount
    logout({ commit }) {
      try {
        return logout(this.state.session.token, this.state.session.refreshtoken).then(res => {
            commit('LOGOUT')
            return res.success
        })
      }
      catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },*/
  //MODELS
    getAllModels({ commit }){
      try{
        return getModels(this.state.session.accessToken).then(res => {
          commit('GETALLMODELS', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getByIdModel({ commit }, id){
      try{
        return getByIdModels(id, this.state.session.accessToken).then(res =>{
          commit('GETBYIDMODELS', res);
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
    // INGREDIENTS
    getAllIngredients({ commit }){
      try{
        return getAllIngredients(this.state.session.accessToken).then(res => {
          commit('GETALLINGREDIENTS', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getByIdIngredient({ commit }, id){
      try{
        return getByIdIngredients(id, this.state.session.accessToken).then(res =>{
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
        console.log('Token: '+this.state.session.accessToken)
        return getQueryIngredients(query, this.state.session.accessToken).then(res =>{
          console.log(res)
          commit('GETQUERYINGREDIENT', res);
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
          commit('GETALLMETHODS', res);
        })
      }catch (err) {
        console.warn(err);
        this.$router.push('Login')
      }
    },
    getByIdMethod({ commit }, id){
      try{
        return getByIdMethods(id, this.state.session.accessToken).then(res =>{
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
}, 
  modules: {
  }
})
