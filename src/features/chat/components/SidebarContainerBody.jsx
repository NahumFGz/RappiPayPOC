import { Icon } from '@iconify/react'
import { Button, ScrollShadow, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { chatUrls } from '../../../routes/urls/chatUrls'
import RecentPromptDropdown from './RecentPromptDropdown'
import { useChatStoreDispatch } from '../../../store/ChatStore'
import { useThemeStoreDispatch } from '../../../store/ThemeStore'

function SidebarContainerBody() {
  const navigate = useNavigate()
  const { theme } = useThemeStoreDispatch()
  const { chatList, activeChatUuid } = useChatStoreDispatch()

  const handleOpenChat = (chatUuid) => {
    navigate(`${chatUrls.conversation}/${chatUuid}`)
  }

  return (
    <>
      <ScrollShadow className='-mr-6 h-full max-h-full pr-6'>
        <Button
          fullWidth
          className='mb-6 mt-2 h-[44px] justify-start gap-3 bg-default-foreground px-3 py-[10px] text-default-50'
          startContent={
            <Icon className='text-default-50' icon='solar:chat-round-dots-linear' width={24} />
          }
          onPress={() => navigate(chatUrls.conversation)}
        >
          New Chat
        </Button>

        <Listbox aria-label='Recent chats' variant='flat'>
          <ListboxSection
            classNames={{
              base: 'py-0',
              heading: 'py-0 pl-[10px] text-small text-default-400'
            }}
            title='Recent'
          >
            {chatList.map((chat) => {
              const isSelected = chat.chatUuid === activeChatUuid

              // Define colores según el tema
              const backgroundColor = isSelected
                ? theme === 'dark'
                  ? '#27272c'
                  : '#f0f0f0'
                : 'transparent'
              const textColor = isSelected
                ? theme === 'dark'
                  ? 'white'
                  : '#000'
                : theme === 'dark'
                ? '#c1c1c1'
                : '#333'

              return (
                <ListboxItem
                  key={chat.chatUuid}
                  className='h-[44px] px-[12px] py-[10px]'
                  style={{
                    backgroundColor,
                    color: textColor
                  }}
                  endContent={<RecentPromptDropdown />}
                  onPress={() => handleOpenChat(chat.chatUuid)}
                >
                  {chat.title}
                </ListboxItem>
              )
            })}

            {/* Renderizar "Show more" */}
            <ListboxItem
              key='id-show-more'
              className='h-[44px] px-[12px] py-[10px] text-default-400'
              endContent={
                <Icon className='text-default-300' icon='solar:alt-arrow-down-linear' width={20} />
              }
              onPress={() => {
                console.log('Show more')
              }}
            >
              Show more
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </ScrollShadow>
    </>
  )
}

export default SidebarContainerBody
