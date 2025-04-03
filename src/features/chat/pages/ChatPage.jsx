import { useParams } from 'react-router-dom'
import { ChatComponent } from '../components/ChatComponent'
import { useEffect } from 'react'
import { useChatStoreDispatch } from '../../../store/ChatStore'
import { useChatApi } from '../hooks/useChatApi'

export function ChatPage() {
  const { chatUuid } = useParams()
  const { getChatListApiCall, getMessageListApiCall } = useChatApi()
  const {
    chatList,
    activeChatUuid,
    setActiveChatUudi,
    setChatList,
    setChatActiveMessages,
    cleanActiveChat,
    refetchChats,
    chatActiveMessages
  } = useChatStoreDispatch()

  //* Manejo de uuid de chat activo
  useEffect(() => {
    if (chatUuid) {
      setActiveChatUudi(chatUuid)
    } else {
      setActiveChatUudi(null)
      cleanActiveChat()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUuid])

  //* Fetch de lista de chats
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const params = { page: 1, pageSize: 30 }
        const res = await getChatListApiCall(params)
        setChatList(res.listElements)
        console.log('Chat list:', res)
      } catch (error) {
        console.error('Error fetching chat list:', error)
      }
    }

    fetchChatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchChats])

  //* Fetch de mensajes de chat activo
  useEffect(() => {
    if (activeChatUuid) {
      const fetchChatMessages = async () => {
        try {
          const params = { chatUuid }
          const res = await getMessageListApiCall(params)
          setChatActiveMessages(res.listElements)
        } catch (error) {
          console.error('Error fetching chat messages:', error)
        }
      }

      if (chatUuid) {
        fetchChatMessages()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChatUuid])

  //! Logs
  useEffect(() => {
    console.log('---> activeChatUuid', activeChatUuid)
  }, [activeChatUuid])

  useEffect(() => {
    console.log('---> chatList', chatList)
  }, [chatList])

  useEffect(() => {
    if (activeChatUuid) {
      console.log('xxx--> chatActiveMessages', chatActiveMessages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatActiveMessages])

  return (
    <>
      <ChatComponent />
    </>
  )
}
