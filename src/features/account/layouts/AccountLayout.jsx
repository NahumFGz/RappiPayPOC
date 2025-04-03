import { LateralBar } from '../components/LateralBar/LateralBar'
import { Outlet } from 'react-router-dom'

export function AccountLayout() {
  return (
    <LateralBar>
      <div className='m-4'>
        <Outlet />
      </div>
    </LateralBar>
  )
}
