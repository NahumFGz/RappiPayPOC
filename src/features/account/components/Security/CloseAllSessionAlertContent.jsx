import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useAuthStore } from '../../../../store/AuthStore'
import { useSecurityApi } from '../../hooks/useSecurityApi'

export function CloseAllSessionAlertContent({ closeModal }) {
  const cleanStore = useAuthStore((store) => store.cleanStore)
  const { logoutAllApiCall } = useSecurityApi()

  const handleCloseAllSessions = async () => {
    try {
      console.log('Cerrar todas las sesiones')
      await logoutAllApiCall()
      cleanStore()
    } catch {
      console.log('Error cerrando todas las sesiones')
    }
  }

  return (
    <>
      <header className='flex items-center justify-start gap-2'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-danger-100'>
          <Icon icon='heroicons-outline:exclamation' className='h-6 w-6 text-danger-600' />
        </div>
        <div className='font-semibold text-default-900'>Cerrar todas las sesiones</div>
      </header>

      <div>
        <p className='mt-3 text-sm text-default-500'>
          ¿Está seguro?. Esta acción cerrará las sesiones activas en todos los dispositivos.
        </p>
      </div>

      <footer className='flex justify-end mt-4'>
        <Button color='danger' variant='flat' onPress={handleCloseAllSessions}>
          Cerrar todas las sesiones
        </Button>
        <Button color='default' variant='flat' onPress={closeModal} className='ml-3'>
          Cancelar
        </Button>
      </footer>
    </>
  )
}
