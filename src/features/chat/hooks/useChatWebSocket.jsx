import useWebSocket from 'react-use-websocket'
import { useEffect, useMemo, useState } from 'react'
import { createAuthPathWebsocket } from '../../../services/websocket/websocketInstance'

// Configuración global del WebSocket (URL y eventos)
const useWebSocketService = (options = {}) => {
  // ws://localhost:8000
  const socketUrl = createAuthPathWebsocket('/ws/chat/')

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {
    shouldReconnect: () => true, // Reconexión automática
    ...options // Permite extender la configuración
  })

  return {
    sendMessage,
    lastMessage,
    readyState,
    getWebSocket
  }
}

export function useChatWebSocket() {
  const { sendMessage, lastMessage, readyState } = useWebSocketService({
    onOpen: () => console.log('Conectado al WebSocket de chat'),
    onClose: () => console.log('Desconectado del WebSocket de chat'),
    onError: (error) => console.error('Error en WebSocket de chat:', error)
  })

  const [lastSocketMessage, setLastSocketMessage] = useState(null) // Almacena solo el último mensaje

  // Escucha mensajes entrantes y actualiza el estado con el último mensaje
  useEffect(() => {
    if (lastMessage) {
      try {
        const messageData = JSON.parse(lastMessage.data)
        setLastSocketMessage(messageData) // Actualiza solo el último mensaje
      } catch (error) {
        console.error('Error al parsear mensaje:', error)
      }
    }
  }, [lastMessage])

  // Función para enviar un mensaje formateado
  const sendChatMessage = useMemo(
    () => (messageObject) => {
      // Enviar directamente el objeto formateado como JSON
      sendMessage(JSON.stringify(messageObject))
    },
    [sendMessage]
  )

  return {
    lastSocketMessage, // Devuelve solo el último mensaje recibido
    sendChatMessage,
    readyState
  }
}
