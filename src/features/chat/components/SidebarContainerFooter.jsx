import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/react'
import { useThemeStoreDispatch } from '../../../store/ThemeStore'

function SidebarContainerFooter() {
  const { toggleTheme, theme } = useThemeStoreDispatch()

  return (
    <>
      <div className='mt-auto flex flex-col'>
        <Button
          fullWidth
          className='justify-start text-default-600'
          startContent={
            <Icon className='text-default-600' icon='solar:info-circle-line-duotone' width={24} />
          }
          variant='light'
        >
          Help
        </Button>
        <Button
          className='justify-start text-default-600'
          startContent={
            <Icon
              className='text-default-600'
              icon={theme === 'dark' ? 'solar:moon-linear' : 'solar:sun-linear'}
              width={20}
            />
          }
          variant='light'
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </>
  )
}

export default SidebarContainerFooter
