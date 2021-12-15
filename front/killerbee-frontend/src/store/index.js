import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '../services/authServices'
import { getAllIngredients,getByIdIngredients,getQueryIngredients, putByIdIngredient, deleteByIdIngredient} from '../services/ingredientsServices'
import { postMethod, getMethods, getByIdMethods, getQueryMethods, putMethod, deleteMethod } from '../services/methodsServices'
import { postModel, getModels, getByIdModels, getQueryModels, putByIdModel, deleteModel } from '../services/modelsServices'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    session: {
      toaccessTokenken: localStorage.accessToken,
      refreshToken: localStorage.refreshToken,
      username: localStorage.username,
      password: localStorage.password,
      id: localStorage.id,
      role: localStorage.role
    },
    models:{
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
    ingredients:{
      name: String,
      description: String,
      brand: String,
      type: String,
      color: Object,
      price: Number,
      density: Number,
      young: Number
    },
    methods:{
      name: String,
      description: String,
      modelId: Object,
      steps:[]
    },
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
    ingredient: state => state.model,
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
        //state.username = res.username // ou mettre localStorage.username
        //state.password = res.password // ou mettre localStorage.password
        
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

      console.log("LocalStorage: \n"+ JSON.stringify(localStorage))

      state.session.id = null;
      state.session.token = null;
      state.session.refreshtoken = null;
      state.session.role = null;
      state.session.username = null;
      state.session.password = null;
      
      console.log("Session: \n"+ JSON.stringify(state.session))
    },
    
    //MODEL
    GETALLMODELS(state, payload){
      state.models = payload.data
    },
    GETBYIDMODEL(state, payload){
      state.model = payload.data
    },
    GETQUERYMODEL(state, payload){
      state.model = payload.data
    },
    // INGREDIENT
    GETALLINGREDIENTS(state, payload){
      state.ingredients = payload.data
    },
    GETBYIDINGREDIENT(state, payload){
      state.ingredient = payload.data
    },
    GETQUERYINGREDIENT(state, payload){
      state.ingredient = payload.data
    },
    // METHOD
    GETALLMETHODS(state, payload){
      state.methods = payload.data
    },
    GETBYIDMETHOD(state, payload){
      state.method = payload.data
    },
    GETQUERYMETHOD(state, payload){
      state.method = payload.data
    }
    //STEP
  },
  actions: {
    // SESSION - Connexion of the user
    login({ commit }, payload) { // ATTENTION, on peut get response.statut pour voir les succès ou non de la connexion
      commit('LOGOUT')
      try {
        return login(payload.username, payload.password).then(res => {
          console.log("Store:")
          console.log('Status Request:')
          console.log(res.status)
          console.log('Body Request:')
          console.log(res.body)
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
  },
  //MODELS
  getAllModels({ commit }){
    try{
      return getModels().then(res => {
        commit('GETALLMODELS', res);
      })
    }catch (err) {
      console.warn(err);
      this.$router.push('Login')
    }
  },
  getByIdModel({ commit }, id){
    try{
      return getByIdModels(id, this.state.session.accessToken)
    }catch (err) {
      console.warn(err);
      this.$router.push('Login')
    }
  },
  // INGREDIENTS


  //METHODS

  modules: {
  }
})
