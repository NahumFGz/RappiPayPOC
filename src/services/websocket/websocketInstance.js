import { useAuthStore } from '../../store/AuthStore'

const BASE_WEBSOCKET_URL = import.meta.env.VITE_BASE_WEBSOCKET_URL

function createAuthPathWebsocket(path) {
  const getToken = () => useAuthStore.getState().token

  return `${BASE_WEBSOCKET_URL}${path}?token=${getToken().access}`
}

export { createAuthPathWebsocket }
