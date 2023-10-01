import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import actions from '../../actions'
import setToken from '../../utils/token'
import LoadingIndicator from '../../components/Common/LoadingIndicator'

// const AuthSuccess = ({ location, authenticated, setAuth }) => {
//   useEffect(() => {
//     const tokenParam = location.search
//     const jwtCookie = tokenParam
//       .slice(tokenParam.indexOf('=') + 1)
//       .replace('%20', ' ')
//     if (jwtCookie) {
//       setToken(jwtCookie)
//       localStorage.setItem('token', jwtCookie)
//       setAuth()
//     }
//   }, [location.search, setAuth])

//   if (authenticated) return <Redirect to='/dashboard' />

//   return <LoadingIndicator />
// }
function AuthSuccess() {
  
  return <></>
}

export default AuthSuccess
