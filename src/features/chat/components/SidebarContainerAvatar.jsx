import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from '@nextui-org/react'
import { AvatarDropdownIcon } from '../../../assets/AvatarDropdownIcon'
import { useAuthStoreDispatch } from '../../../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { accountUrls } from '../../../routes/urls/accountUrls'

function SidebarContainerAvatar() {
  const navigate = useNavigate()
  const { profile, logout } = useAuthStoreDispatch()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Button
              fullWidth
              className='h-[60px] justify-start gap-3 rounded-[14px] border-1 border-default-300 bg-transparent px-3 py-[10px]'
              endContent={<AvatarDropdownIcon height={20} width={20} />}
            >
              <div className='flex w-full items-center gap-3'>
                <Avatar size='sm' src={profile?.profileImages?.tiny} />

                <div className='flex flex-col text-left'>
                  <p className='text-small font-semibold leading-5 text-foreground'>{`${profile?.firstName} ${profile?.lastName}`}</p>
                  <p className='text-tiny text-default-400'>{profile?.email}</p>
                </div>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Profile Actions'
            className='w-[210px] bg-content1 px-[8px] py-[8px]'
            variant='flat'
          >
            <DropdownItem key='profile' textValue='profile' className='h-14'>
              <div className='flex w-full items-center gap-3'>
                <Avatar size='sm' src={profile?.profileImages?.tiny} />

                <div className='flex flex-col text-left'>
                  <p className='text-small font-normal leading-5 text-foreground'>{`${profile?.firstName} ${profile?.lastName}`}</p>
                  <p className='text-tiny text-default-400'>{profile?.email}</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownSection showDivider aria-label='profile-section-1' className='px-0'>
              <DropdownItem
                key='settings'
                className='py-[4px] text-default-500'
                onPress={() => navigate(accountUrls.security)}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key='my-profile'
                className='py-[4px] text-default-500'
                onPress={() => navigate(accountUrls.profile)}
              >
                My Profile
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label='profile-section-3' className='mb-0'>
              <DropdownItem
                key='help-and-feedback'
                className='py-[4px] text-default-500'
                onPress={() => console.log('Go to help and feedback')}
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key='logout'
                className='pt-[4px] text-default-500'
                onPress={() => logout()}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  )
}

export default SidebarContainerAvatar
