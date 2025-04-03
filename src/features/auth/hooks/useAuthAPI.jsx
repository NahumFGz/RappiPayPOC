import {
  loginAccessApi,
  authMeApi,
  resetPasswordApi,
  registerApi,
  resetPasswordConfirmApi
} from '../../../services/api/auth/authAPI'

export function useAuthAPI() {
  const loginAccess = async (email, password) => {
    try {
      const response = await loginAccessApi(email, password)
      return response
    } catch (error) {
      throw new Error(`Login failed ${error}`)
    }
  }

  const authMe = async () => {
    try {
      const response = await authMeApi()
      return response
    } catch (error) {
      throw new Error(`Error getting profile ${error}`)
    }
  }

  const resetPassword = async (email) => {
    try {
      const response = await resetPasswordApi(email)
      return response
    } catch (error) {
      throw new Error(`Error sending email ${error}`)
    }
  }

  const registerUser = async (values) => {
    try {
      const response = await registerApi(values)
      return response
    } catch (error) {
      throw new Error(`Error registering user ${error}`)
    }
  }

  const resetPasswordConfirm = async (values) => {
    try {
      const response = await resetPasswordConfirmApi(values)
      return response
    } catch (error) {
      throw new Error(`Error resetting password ${error}`)
    }
  }

  return { loginAccess, authMe, resetPassword, registerUser, resetPasswordConfirm }
}
