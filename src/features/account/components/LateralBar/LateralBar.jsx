import Sidebar from './Sidebar'
import SidebarDrawer from './SidebarDrawer'
import { Icon } from '@iconify/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Spacer, useDisclosure } from '@nextui-org/react'
import { AcmeLogo } from '../../../../assets/SocialIcons'
import { accountUrls } from '../../../../routes/urls/accountUrls'
import { useAuthStoreDispatch } from '../../../../store/AuthStore'

import { sectionItems } from './SidebarItems'
import { useThemeStoreDispatch } from '../../../../store/ThemeStore'
import { chatUrls } from '../../../../routes/urls/chatUrls'

export function LateralBar({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { toggleTheme, theme } = useThemeStoreDispatch()
  const { profile, logout } = useAuthStoreDispatch()

  const getPageTitle = () => {
    switch (location.pathname) {
      // accountSettings
      case accountUrls.profile:
        return 'Profile'
      case accountUrls.security:
        return 'Security'
      default:
        return 'Overview'
    }
  }

  const content = (
    <div className='relative flex h-full w-72 flex-1 flex-col p-6'>
      <div className='flex items-center gap-2 px-2'>
        <div
          title='title-lateral-bar'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-foreground'
        >
          <AcmeLogo className='text-background' />
        </div>
        <span title='title-lateral-bar' className='text-small font-bold  text-foreground'>
          ACME AI - v0.2-beta
        </span>
      </div>
      <Spacer y={8} />
      <div className='flex items-center gap-3 px-3'>
        <Avatar isBordered size='sm' src={profile?.profileImages?.tiny} />
        <div className='flex flex-col'>
          <p className='text-small font-medium text-default-600'>{`${profile?.firstName} ${profile?.lastName}`}</p>
          <p className='text-tiny text-default-400'>{profile?.email}</p>
        </div>
      </div>

      <Spacer y={8} />

      <Sidebar defaultSelectedKey='home' items={sectionItems} />

      <Spacer y={8} />
      <div className='mt-auto flex flex-col'>
        <Button
          className='justify-start text-default-500 data-[hover=true]:text-foreground'
          startContent={
            theme === 'dark' ? (
              <Icon className='text-default-500' icon='solar:sun-2-outline' width={24} />
            ) : (
              <Icon className='text-default-500' icon='solar:moon-outline' width={20} />
            )
          }
          variant='light'
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </Button>

        <Button
          fullWidth
          color='default'
          className='justify-start text-default-500 data-[hover=true]:text-foreground'
          startContent={
            <Icon
              className='rotate-180 text-default-500'
              icon='solar:chat-round-call-linear'
              width={24}
            />
          }
          variant='light'
          onPress={() => navigate(chatUrls.conversation)}
        >
          Back to chat
        </Button>

        <Button
          fullWidth
          color='danger'
          className='justify-start text-default-500 data-[hover=true]:text-foreground'
          startContent={
            <Icon
              className='rotate-180 text-default-500'
              icon='solar:minus-circle-outline'
              width={24}
            />
          }
          variant='light'
          onPress={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className='flex h-dvh w-full overflow-hidden'>
      <SidebarDrawer
        className=' !border-r-small border-divider'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className='w-full flex-1 flex-col p-4'>
        <header className='flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4'>
          <Button isIconOnly className='flex sm:hidden' size='sm' variant='light' onPress={onOpen}>
            <Icon
              className='text-default-500'
              height={24}
              icon='solar:hamburger-menu-outline'
              width={24}
            />
          </Button>
          <h2 className='text-medium font-medium text-default-700'>{getPageTitle()}</h2>
        </header>
        <main className='mt-4 h-full w-full overflow-auto'>
          <div className='flex h-[92%] w-full flex-col gap-4 box-border rounded-medium border-small border-divider overflow-auto'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
