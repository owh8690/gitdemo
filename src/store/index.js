import Vue from 'vue'
import Vuex from 'vuex'
import {post} from "../utils/http"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    isFromDetail:false,
    role:""
  },
  getters: {
  },
  mutations: {
    getRow(state,payload){
      console.log("payload:",payload)
      state.row=payload 
    },
    clearRow(state){
      state.row={}
    },
    changeFromDetail(state,payload){
      state.isFromDetail=payload
    },
    setRole(state,payload){
      state.role=payload
    }
  },
  actions: {
    async getRole({commit}){
     let {auth}=await post("/getRole")
     commit("setRole",auth)
    }
  },
  modules: {
  }
})
