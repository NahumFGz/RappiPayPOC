import { useEffect } from 'react'
import { Login } from '../components/Login'
import { AuthLayout } from '../layouts/AuthLayout'

export function LoginPage() {
  useEffect(() => {
    console.log('.....>')
    console.log(import.meta.env.VITE_BASE_WEBSOCKET_URL)
    console.log(import.meta.env.VITE_BASE_API_URL)
    console.log(import.meta.env)
  }, [])

  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  )
}
