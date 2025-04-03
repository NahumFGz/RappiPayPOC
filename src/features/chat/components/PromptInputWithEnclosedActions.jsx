import { Button, Tooltip } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { cn } from '@nextui-org/react'
import PromptInput from './PromptInput'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAvatar, aiAvatar } from '../../../services/api/chat/chatAPI'
import { useChatWebSocket } from '../../../features/chat/hooks/useChatWebSocket'
import { useChatStoreDispatch } from '../../../store/ChatStore'
import { chatUrls } from '../../../routes/urls/chatUrls'

const connectionStatus = {
  0: 'Conectando',
  1: 'Conectado',
  2: 'Cerrando',
  3: 'Desconectado'
}

export default function PromptInputWithEnclosedActions(props) {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { sendChatMessage, lastSocketMessage, readyState } = useChatWebSocket()
  const {
    activeChatUuid: chatUuid,
    insertMessage: setMessages,
    onRefetchChats
  } = useChatStoreDispatch()

  useEffect(() => {
    console.log('Estado del WebSocket:', connectionStatus[readyState])
  }, [readyState])

  const handleSendPrompt = () => {
    if (!prompt || isSending) return

    setIsSending(true) // Bloquea el envío

    // Agrega el mensaje del usuario a la lista de mensajes
    setMessages({
      avatar: userAvatar,
      message: prompt,
      name: 'You',
      isRTL: true
    })

    // Envía el mensaje al WebSocket
    const messageObject = {
      chat_uuid: chatUuid || null,
      message: prompt
    }
    sendChatMessage(messageObject)

    // Limpia el campo de entrada
    setPrompt('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendPrompt()
    }
  }

  useEffect(() => {
    if (lastSocketMessage) {
      console.log('Respuesta del WebSocket:', lastSocketMessage)

      // Inserta la respuesta del WebSocket en la lista de mensajes
      setMessages({
        avatar: aiAvatar,
        message: lastSocketMessage.response,
        name: 'Acme AI',
        isRTL: false
      })

      // Verifica si se ha devuelto un nuevo chat_uuid y redirige
      if (lastSocketMessage.chat_uuid && lastSocketMessage.chat_uuid !== chatUuid) {
        navigate(`${chatUrls.conversation}/${lastSocketMessage.chat_uuid}`)
        onRefetchChats()
      }

      setIsSending(false) // Permite un nuevo envío
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSocketMessage])

  return (
    <form className='flex w-full items-start gap-2' onSubmit={(e) => e.preventDefault()}>
      <PromptInput
        {...props}
        classNames={{
          innerWrapper: cn('items-center', props.classNames?.innerWrapper),
          input: cn(
            'text-medium data-[has-start-content=true]:ps-0 data-[has-start-content=true]:pe-0',
            props.classNames?.input
          )
        }}
        endContent={
          <div className='flex gap-2'>
            {!prompt && (
              <Tooltip showArrow content='Speak'>
                <Button isIconOnly radius='full' variant='light'>
                  <Icon className='text-default-500' icon='solar:microphone-3-linear' width={20} />
                </Button>
              </Tooltip>
            )}
            <Tooltip showArrow content={isSending ? 'Sending...' : 'Send message'}>
              <Button
                isIconOnly
                className={props?.classNames?.button || ''}
                color={!prompt || isSending ? 'default' : 'primary'}
                isDisabled={!prompt || isSending}
                radius='full'
                variant={!prompt || isSending ? 'flat' : 'solid'}
                onPress={handleSendPrompt}
              >
                <Icon
                  className={cn(
                    '[&>path]:stroke-[2px]',
                    !prompt || isSending ? 'text-default-500' : 'text-primary-foreground',
                    props?.classNames?.buttonIcon || ''
                  )}
                  icon={isSending ? 'solar:tornado-outline' : 'solar:arrow-up-linear'}
                  width={20}
                />
              </Button>
            </Tooltip>
          </div>
        }
        startContent={
          <Tooltip showArrow content='Add file'>
            <Button isIconOnly className='p-[10px]' radius='full' variant='light'>
              <Icon className='text-default-500' icon='solar:paperclip-linear' width={20} />
            </Button>
          </Tooltip>
        }
        value={prompt}
        onValueChange={setPrompt}
        onKeyDown={handleKeyDown}
      />
    </form>
  )
}
