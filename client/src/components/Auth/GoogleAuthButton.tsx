import React from 'react'
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { BackendUrl, GOOGLE_CLIENT_ID } from '../../config/AppConfig'

const GoogleAuthButton: React.FC = () => {
  const handleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      const token = response.credential

      try {
        const res = await axios.post(BackendUrl+'/auth/google', { token })

        console.log('User authenticated:', res.data)
        localStorage.setItem('jwt', res.data.token)
      } catch (error) {
        console.error('Error during authentication:', error)
      }
    }
  }

  const handleError = () => {
    console.error('Google Login Failed')
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
    </GoogleOAuthProvider>
  )
}

export default GoogleAuthButton
