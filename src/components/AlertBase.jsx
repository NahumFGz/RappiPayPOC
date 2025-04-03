export function AlertBase({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    // Contenedor principal que cubre toda la pantalla con manejo de overflow-y bloqueado cuando está abierto
    <div
      className={`fixed inset-0 z-[100] ${isOpen ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
      onClick={onClose}
    >
      {/* Contenedor flex para centrar el alert vertical y horizontalmente */}
      <div
        className='flex items-center justify-center min-h-screen px-4 text-center transform translate-y-[-10vh]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenedor del alert con manejo de overflow y max-height */}
        <div className='relative bg-white dark:bg-black rounded-lg px-4 pt-5 pb-4 text-left shadow-2xl transform transition-all sm:max-w-xl sm:w-full sm:p-6 max-h-[90vh] overflow-y-auto'>
          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className='absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700'
          >
            &times;
          </button>
          {/* Contenido del alert */}
          {children}
        </div>
      </div>
    </div>
  )
}
