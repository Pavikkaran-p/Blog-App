import React from 'react'
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { BackendUrl } from '../../config/AppConfig'
import { useNavigate } from 'react-router-dom'

const GoogleAuthButton: React.FC = () => {
  const navigate = useNavigate()
  const handleSuccess = async (response: CredentialResponse) => {
    console.log(response)
    if (response.credential) {
      const token = response.credential
      try {
        const res = await axios.post(BackendUrl+'/api/v1/auth/google', { token })

        console.log('User authenticated:', res.data)
        localStorage.setItem('authToken', res.data.token)
        navigate('/myblogs')
      } catch (error) {
        console.error('Error during authentication:', error)
      }
    }
  }

  const handleError = () => {
    console.error('Google Login Failed')
  }

  return (
    <GoogleOAuthProvider clientId="854040976352-2adoem7uhhcpqpckoq7rhj7hjsljisul.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
    </GoogleOAuthProvider>
  )
}

export default GoogleAuthButton
