import { createAxiosInstance, createAxiosAuthInstance } from '../axiosInstance'
const BASE_URL = import.meta.env.VITE_BASE_API_URL

export async function loginAccessApi(email, password) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/login-access/', { email, password })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Login failed')
    }
  } catch (error) {
    throw new Error(`Login failed: ${error}`)
  }
}

export async function loginRefreshApi(refreshToken) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/login-refresh/', { refresh: refreshToken })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Refresh token failed')
    }
  } catch (error) {
    throw new Error(`Refresh token failed: ${error}`)
  }
}

export async function registerApi(registerFormData) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/register/', registerFormData)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data
    }
    throw new Error('No se pudo conectar con la API')
  }
}

export async function resetPasswordApi(email) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/password-reset/', { email })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Reset password failed')
    }
  } catch (error) {
    throw new Error(`Reset password failed ${error}`)
  }
}

export async function resetPasswordConfirmApi(resetPasswordConfirmData) {
  try {
    const { uidb64, token } = resetPasswordConfirmData
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post(
      `/api/auth/password-reset-confirm/${uidb64}/${token}/`,
      resetPasswordConfirmData
    )
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Reset password confirm failed')
    }
  } catch (error) {
    throw new Error(`Reset password confirm failed ${error}`)
  }
}

export async function authMeApi(accessToken) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.get('/api/auth/me/')
    const { data, status } = response

    if (status === 200) {
      return {
        id: data.id,
        email: data.email,
        profileImages: {
          principal: data.profile_images.principal
            ? `${BASE_URL}${data.profile_images.principal}`
            : '',
          tiny: data.profile_images.tiny ? `${BASE_URL}${data.profile_images.tiny}` : ''
        },
        firstName: data.first_name,
        lastName: data.last_name,
        birthDate: data.birth_date,
        isEmailVerified: data.is_email_verified,
        useberType: String(data.useber_type)
      }
    } else {
      throw new Error('AuthMe failed')
    }
  } catch (error) {
    throw new Error(`AuthMe failed ${error}`)
  }
}
