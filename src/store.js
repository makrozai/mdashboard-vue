import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    isLoading: state => state.loading,
    getError: state => state.error
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_TOKEN (state, token) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
      } else {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
      }
    },
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_ERROR (state, error) {
      state.error = error
    },
    CLEAR_AUTH (state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    async login ({ commit }, credentials) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials)
        const { token, user } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        return true
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Error al iniciar sesión')
        return false
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async register ({ commit }, userData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await axios.post(`${API_URL}/auth/register`, userData)
        const { token, user } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        return true
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Error al registrar')
        return false
      } finally {
        commit('SET_LOADING', false)
      }
    },
    logout ({ commit }) {
      commit('CLEAR_AUTH')
    },
    async fetchUser ({ commit, state }) {
      if (!state.token) return
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${API_URL}/auth/me`)
        commit('SET_USER', response.data.user)
      } catch (error) {
        commit('CLEAR_AUTH')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})
