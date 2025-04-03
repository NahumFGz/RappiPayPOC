import { formatLocalYYYYMMDDHHMM } from '../../utilities/formatDate'
import { createAxiosAuthInstance } from '../axiosInstance'

export const userAvatar =
  'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg'
export const aiAvatar =
  'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png'

export async function getChatListApi(params = {}) {
  try {
    const { page, pageSize } = params

    const urlParams = new URLSearchParams()
    if (page) urlParams.append('page', page)
    if (pageSize) urlParams.append('page_size', pageSize)

    const url = `/api/chats/?${urlParams.toString()}`
    const axiosInstance = createAxiosAuthInstance()
    const response = await axiosInstance.get(url)
    const { data, status } = response

    if (status === 200) {
      const totalElements = data.count
      const listElements = data.results.map((chat) => {
        return {
          id: chat.id,
          userId: chat.user,
          chatUuid: chat.chat_uuid,
          title: chat.title ? chat.title : `Chat history ${chat.id}`,
          createdAt: formatLocalYYYYMMDDHHMM(chat.created_at),
          updatedAt: formatLocalYYYYMMDDHHMM(chat.updated_at)
        }
      })

      return { totalElements, listElements }
    }
  } catch {
    throw new Error('Get chat list failed')
  }
}

export async function getMessageListApi(params = {}) {
  try {
    const { chatUuid } = params

    const urlParams = new URLSearchParams()
    if (chatUuid) urlParams.append('chat_session__chat_uuid', chatUuid)

    const url = `/api/messages/?${urlParams.toString()}`
    const axiosInstance = createAxiosAuthInstance()
    const response = await axiosInstance.get(url)
    const { data, status } = response

    if (status === 200) {
      const listElements = data.map((message) => {
        return {
          avatar: message.sender_type === 'user' ? userAvatar : aiAvatar,
          message: message.content,
          name: message.sender_type === 'user' ? 'You' : 'Acme AI',
          isRTL: message.sender_type === 'user' ? true : false
        }
      })

      return { listElements }
    }
  } catch {
    throw new Error('Get messages list failed')
  }
}
