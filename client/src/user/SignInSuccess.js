import React, { useEffect } from 'react'
import { authenticate } from '../auth'
import { useHistory } from 'react-router-dom'

function SignInSuccess() {
  const history = useHistory()
  useEffect(() => {
    const urlString = window.location.href
    var url = new URL(urlString)
    var params = new URLSearchParams(url.search)
    var token = params.get('token')
    var _id = params.get('id')
    var role = parseInt(params.get('role'))
    var name = params.get('name')
    var email = params.get('email')
    const jwt = { token, user: { _id, email, name, role } }
    authenticate(jwt, () => {})
    redirectUser(parseInt(role))
    // Log the parameters
  }, [])

  const redirectUser = (role) => {
    if (role === 1) {
      history.push('/admin/dashboard')
    } else {
      history.push('/user/dashboard')
    }
  }

  return <></>
}
export default SignInSuccess
