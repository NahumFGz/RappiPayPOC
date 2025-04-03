import { useMemo } from 'react'

import { getChatListApi, getMessageListApi } from '../../../services/api/chat/chatAPI'

export function useChatApi() {
  const getChatListApiCall = useMemo(() => {
    return async (params) => {
      try {
        const res = await getChatListApi(params)
        return res
      } catch (error) {
        throw new Error(`Get chat list failed: ${error.message}`)
      }
    }
  }, [])

  const getMessageListApiCall = useMemo(() => {
    return async (params) => {
      try {
        const res = await getMessageListApi(params)
        return res
      } catch (error) {
        throw new Error(`Get message list failed: ${error.message}`)
      }
    }
  }, [])

  return { getChatListApiCall, getMessageListApiCall }
}
