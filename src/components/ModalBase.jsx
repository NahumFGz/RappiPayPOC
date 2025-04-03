import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

export function ModalBase({
  isOpen,
  onClose,
  modalTitle,
  modalBody,
  modalFooter,
  isDismissable = true
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      scrollBehavior='inside'
      isDismissable={isDismissable}
      classNames={{
        base: 'w-auto max-w-full min-w-[400px]'
      }}
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            {modalTitle && <ModalHeader className='flex flex-col gap-1'>{modalTitle}</ModalHeader>}
            {modalBody && <ModalBody className='mb-2'>{modalBody}</ModalBody>}
            {modalFooter && (
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onCloseModal}>
                  Cerrar
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
