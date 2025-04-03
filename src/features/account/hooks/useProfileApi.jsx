import { useMemo } from 'react'
import { useAuthStoreDispatch } from '../../../store/AuthStore'
import {
  getAccountApi,
  patchAccountApi,
  updateProfileImageApi
} from '../../../services/api/account/profileAPI'

export function useProfileApi() {
  const { profile } = useAuthStoreDispatch()

  const getAccountApiCall = useMemo(() => {
    return async () => {
      try {
        const res = await getAccountApi(profile.id)
        return res
      } catch (error) {
        throw new Error(`Get account failed: ${error.message}`)
      }
    }
  }, [profile])

  const patchAccountApiCall = useMemo(() => {
    return async (accountData) => {
      try {
        const res = await patchAccountApi(profile.id, accountData)
        return res
      } catch (error) {
        throw new Error(`Patch account failed: ${error.message}`)
      }
    }
  }, [profile])

  const updateProfileImageApiCall = useMemo(() => {
    return async (profileImage) => {
      try {
        const res = await updateProfileImageApi(profile.id, profileImage)
        return res
      } catch (error) {
        throw new Error(`Update profile image failed: ${error.message}`)
      }
    }
  }, [profile])

  return { getAccountApiCall, patchAccountApiCall, updateProfileImageApiCall }
}
