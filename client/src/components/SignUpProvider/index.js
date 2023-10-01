import React from 'react'

import { GoogleIcon } from '../Icon'
import GoogleButton from 'react-google-button'
import { makeStyles } from '@material-ui/core'
// import GoogleIcon from '@mui/icons-material/Google'

const API_URL = process.env.REACT_APP_API_URL

const useStyles = makeStyles((theme) => ({
  google: {
    margin: theme.spacing(2, 0, 0),
  },
}))

const SignupProvider = () => {
  const classes = useStyles()
  return (
    <div className='signup-provider'>
      <a
        href={`${API_URL}/auth/google`}
        className='mb-2 google-btn text-decoration-none'
      >
        <GoogleButton
          className={classes.google}
          type='light'
          style={{
            width: '100%',
            borderRadius: '5px',
            height: '49px',
            fontWeight: 'bold',
            marginLeft: '0px',
          }}
        />
      </a>
    </div>
  )
}

export default SignupProvider
