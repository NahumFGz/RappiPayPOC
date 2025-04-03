import {
  ScrollShadow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button
} from '@nextui-org/react'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import SidebarContainer from './SidebarContainer'
import MessagingChatMessage from './MessagingChatMessage'
import PromptInputWithEnclosedActions from './PromptInputWithEnclosedActions'
import { useEffect, useRef } from 'react'
import { AcmeIcon } from '../../../assets/SocialIcons'
import { useChatStoreDispatch } from '../../../store/ChatStore'

const cardMessages = [
  {
    key: 'message1',
    description: '¿Quieres saber qué empresas han contratado con el Estado?',
    icon: <Icon className='text-primary-700' icon='solar:notebook-square-bold' width={24} />
  },
  {
    key: 'message2',
    description: 'Consulta el historial de contrataciones de una empresa específica.',
    icon: <Icon className='text-danger-600' icon='solar:chat-square-like-bold' width={24} />
  },
  {
    key: 'message3',
    description: 'Revisa las asistencias y votaciones de congresistas.',
    icon: <Icon className='text-warning-600' icon='solar:user-id-bold' width={24} />
  },
  {
    key: 'message4',
    description: 'Explora empresas con contratos superiores a 250,000 soles.',
    icon: <Icon className='text-success-600' icon='solar:gameboy-bold' width={24} />
  }
]

export function ChatComponent() {
  const { activeChatUuid: chatUuid, chatActiveMessages: messages } = useChatStoreDispatch()

  const scrollContainerRef = useRef(null)
  const scrollToBottomRef = useRef(null)

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className='h-full w-full max-w-full'>
      <SidebarContainer
        header={
          <Dropdown className='bg-content1'>
            <DropdownTrigger>
              <Button
                className='min-w-[120px] text-default-400'
                endContent={
                  <Icon
                    className='text-default-400'
                    height={20}
                    icon='solar:alt-arrow-down-linear'
                    width={20}
                  />
                }
                variant='light'
              >
                ACME v4
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Dropdown menu with icons'
              className='px-0 py-[16px]'
              variant='faded'
            >
              <DropdownSection
                classNames={{
                  heading: 'text-tiny px-[10px]'
                }}
                title='Model'
              >
                <DropdownItem
                  key='acme-v4'
                  className='text-default-500 data-[hover=true]:text-default-500'
                  classNames={{
                    description: 'text-default-500 text-tiny'
                  }}
                  description='Newest and most advanced model'
                  endContent={
                    <Icon
                      className='text-default-foreground'
                      height={24}
                      icon='solar:check-circle-bold'
                      width={24}
                    />
                  }
                  startContent={
                    <Icon
                      className='text-default-400'
                      height={24}
                      icon='solar:star-rings-linear'
                      width={24}
                    />
                  }
                >
                  ACME v4
                </DropdownItem>

                <DropdownItem
                  key='acme-v3.5'
                  className='text-default-500 data-[hover=true]:text-default-500'
                  classNames={{
                    description: 'text-default-500 text-tiny'
                  }}
                  description='Advanced model for complex tasks'
                  startContent={
                    <Icon
                      className='text-default-400'
                      height={24}
                      icon='solar:star-shine-outline'
                      width={24}
                    />
                  }
                >
                  ACME v3.5
                </DropdownItem>

                <DropdownItem
                  key='acme-v3'
                  className='text-default-500 data-[hover=true]:text-default-500'
                  classNames={{
                    description: 'text-default-500 text-tiny'
                  }}
                  description='Great for everyday tasks'
                  startContent={
                    <Icon
                      className='text-default-400'
                      height={24}
                      icon='solar:star-linear'
                      width={24}
                    />
                  }
                >
                  ACME v3
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        }
        subTitle='Today'
        title='Apply for launch promotion'
      >
        <div className='relative flex h-full flex-col'>
          {chatUuid ? (
            <ScrollShadow
              className='flex h-full max-h-[75vh] flex-col gap-6 overflow-y-auto p-6 pb-8'
              ref={scrollContainerRef}
            >
              {messages.map((message, idx) => (
                <MessagingChatMessage
                  key={idx}
                  classNames={{
                    base: 'bg-default-50'
                  }}
                  {...message}
                />
              ))}
              <div ref={scrollToBottomRef} />
            </ScrollShadow>
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-10 mx-30 mx-7'>
              <div className='flex rounded-full bg-foreground'>
                <AcmeIcon className='text-background' size={56} />
              </div>
              <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                {cardMessages.map((message) => (
                  <Card
                    key={message.key}
                    className='h-auto bg-default-100 px-[20px] py-[16px]'
                    shadow='none'
                  >
                    <CardHeader className='p-0 pb-[9px]'>{message.icon}</CardHeader>
                    <CardBody className='p-0 text-small text-default-400'>
                      {message.description}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <div className='mt-auto flex max-w-full flex-col gap-2 px-6'>
            <PromptInputWithEnclosedActions
              classNames={{
                button:
                  'bg-default-foreground opacity-100 w-[30px] h-[30px] !min-w-[30px] self-center',
                buttonIcon: 'text-background',
                input: 'placeholder:text-default-500'
              }}
              placeholder='Send a message to AcmeAI'
            />

            <p className='px-2 text-center text-small font-medium leading-5 text-default-500'>
              AcmeAI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </SidebarContainer>
    </div>
  )
}
