import { getCookie, setCookie } from '../common/common'
import { API } from '../config'
import axios from 'axios'

export const signup = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const signin = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    next()
  }
}

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
    next()
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response)
      })
      .catch((err) => console.log(err))
  }
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}

export const getcsrftoken = async (token) => {
  const csrfToken = getCookie('_csrf')
  // const response = await fetch(`${API}/getCSRFToken`, {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //     'CSRF-Token': csrfToken,
  //     'X-CSRF-Token': csrfToken,
  //     'x-csrf-token': csrfToken,
  //   },
  // })
  const response = await axios.get(`${API}/getCSRFToken`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'CSRF-Token': csrfToken,
      'X-CSRF-Token': csrfToken,
    },
  })
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken
  // console.log(response)
  setCookie('_csrf', response.data.CSRFToken)
  return response.data
}
