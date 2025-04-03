import { useState } from 'react'
import { ChangePasswordForm } from '../components/Security/ChangePasswordForm'
import { CloseAllSessions } from '../components/Security/CloseAllSessions'
import { CloseAllSessionAlertContent } from '../components/Security/CloseAllSessionAlertContent'
import { AlertBase } from '../../../components/AlertBase'

export function SecurityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className='mb-4'>
        <ChangePasswordForm />
      </div>
      <div>
        <CloseAllSessions openModal={openModal} />
      </div>
      <AlertBase isOpen={isModalOpen} onClose={closeModal}>
        <CloseAllSessionAlertContent closeModal={closeModal} />
      </AlertBase>
    </>
  )
}
