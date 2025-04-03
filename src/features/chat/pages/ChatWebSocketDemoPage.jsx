import { useState } from 'react'
import { useChatWebSocket } from '../hooks/useChatWebSocket'

export const ChatWebSocketDemoPage = () => {
  const { lastSocketMessage, sendChatMessage, readyState } = useChatWebSocket()
  const [chatUuid, setChatUuid] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const connectionStatus = {
    0: 'Conectando',
    1: 'Conectado',
    2: 'Cerrando',
    3: 'Desconectado'
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageObject = {
        chat_uuid: chatUuid.trim() === '' ? null : chatUuid,
        message: newMessage
      }
      console.log('Enviando mensaje:', messageObject)
      sendChatMessage(messageObject)
      setNewMessage('')
    } else {
      console.log('Mensaje vacío. No se enviará nada.')
    }
  }

  return (
    <div>
      <h1>Chat WebSocket</h1>
      <p>Estado de conexión: {connectionStatus[readyState]}</p>

      <div>
        <h2>Último mensaje recibido:</h2>
        {lastSocketMessage ? (
          <div>
            <strong>Chat UUID:</strong> {lastSocketMessage.chat_uuid ?? 'N/A'}
            <br />
            <strong>Respuesta:</strong> {lastSocketMessage.response ?? 'N/A'}
          </div>
        ) : (
          <p>No hay mensajes recibidos aún.</p>
        )}
      </div>

      <div>
        <input
          type='text'
          value={chatUuid}
          onChange={(e) => setChatUuid(e.target.value)}
          placeholder='UUID del chat (opcional)'
        />
        <br />
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Escribe un mensaje'
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  )
}
