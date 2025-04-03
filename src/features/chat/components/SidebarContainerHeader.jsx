import { AcmeIcon } from '../../../assets/SocialIcons'

function SidebarContainerHeader() {
  return (
    <>
      <div className='flex items-center gap-2 px-2'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-foreground'>
          <AcmeIcon className='text-background' />
        </div>
        <span className='text-base font-bold leading-6 text-foreground'>ACME AI - v0.2-beta</span>
      </div>
    </>
  )
}

export default SidebarContainerHeader
