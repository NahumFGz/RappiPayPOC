import { useMemo } from 'react'
import { changePasswordApi, logoutAllApi } from '../../../services/api/account/securityAPI'

export function useSecurityApi() {
  const changePasswordApiCall = useMemo(() => {
    return async (changePasswordForm) => {
      try {
        const res = await changePasswordApi(changePasswordForm)
        return res
      } catch (error) {
        throw new Error(`Change password failed: ${error.message}`)
      }
    }
  }, [])

  const logoutAllApiCall = useMemo(() => {
    return async () => {
      try {
        await logoutAllApi()
      } catch (error) {
        throw new Error(`Logout all sessions failed: ${error.message}`)
      }
    }
  }, [])

  return { logoutAllApiCall, changePasswordApiCall }
}
