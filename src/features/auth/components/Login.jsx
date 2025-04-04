import { Icon } from '@iconify/react'
import { Button, Input, Checkbox, Link, Divider } from '@nextui-org/react'

import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { AcmeIcon } from '../../../assets/SocialIcons'
import { ModalBase } from '../../../components/ModalBase'
import { ThemeSwitchButton } from '../../../components/ThemeSwitchButton'
import { useAuthStoreDispatch } from '../../../store/AuthStore'
import { useAuthAPI } from '../hooks/useAuthAPI'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { authUrls } from '../../../routes/urls/authUrls'
import { chatUrls } from '../../../routes/urls/chatUrls'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

export function Login() {
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const { loginAccess, authMe } = useAuthAPI()
  const { isAuth, setToken, setProfile, setRememberMe } = useAuthStoreDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const formik = useFormik({
    initialValues: { email: '', password: '', remember: true },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Set remember me
        setRememberMe(values.remember)

        // Access the login API endpoint
        const response = await loginAccess(values.email, values.password)
        setToken(response)

        // Get authenticated user profile
        const responseMe = await authMe()
        setProfile(responseMe)

        // Redirect user to conversation page
        navigate(chatUrls.conversation, { replace: true })
      } catch (error) {
        toast.error(error.message)
      }
    }
  })

  const handleNavigate = (url) => {
    navigate(url)
  }

  useEffect(() => {
    // Redirect authenticated user to conversation page
    if (isAuth) navigate(chatUrls.conversation, { replace: true })
  }, [isAuth, navigate])

  if (isAuth) return null

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center pb-6'>
        <div
          title='Haz clic para ir a la página de inicio'
          className='cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out transform hover:scale-110'
          onClick={() => handleNavigate(chatUrls.conversation)}
        >
          <AcmeIcon size={60} />
        </div>
        <p className='text-xl font-medium'>Welcome Back</p>
        <p className='text-small text-default-500'>Log in to your account to continue</p>
      </div>
      <div className='mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small'>
        <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
          <Input
            label='Email Address'
            name='email'
            placeholder='Enter your email'
            type='email'
            variant={formik.touched.email && formik.errors.email ? 'flat' : 'bordered'}
            color={formik.touched.email && formik.errors.email ? 'danger' : 'default'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <Input
            endContent={
              <button type='button' onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className='pointer-events-none text-2xl text-default-400'
                    icon='solar:eye-closed-linear'
                  />
                ) : (
                  <Icon
                    className='pointer-events-none text-2xl text-default-400'
                    icon='solar:eye-bold'
                  />
                )}
              </button>
            }
            label='Password'
            name='password'
            placeholder='Enter your password'
            type={isVisible ? 'text' : 'password'}
            variant={formik.touched.password && formik.errors.password ? 'flat' : 'bordered'}
            color={formik.touched.password && formik.errors.password ? 'danger' : 'default'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? 'border-red-500' : ''}
          />

          <div className='flex items-center justify-between px-1 py-2'>
            <Checkbox
              name='remember'
              size='sm'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isSelected={formik.values.remember}
            >
              Remember me
            </Checkbox>
            <Link className='text-default-500 cursor-pointer' size='sm' onPress={() => openModal()}>
              Forgot password?
            </Link>
          </div>
          <Button color='primary' type='submit'>
            Log In
          </Button>
        </form>
        <div className='flex items-center gap-4'>
          <Divider className='flex-1' />
          <p className='shrink-0 text-tiny text-default-500'>OR</p>
          <Divider className='flex-1' />
        </div>
        <div className='flex flex-col gap-2'>
          <Button
            isDisabled
            startContent={<Icon icon='flat-color-icons:google' width={24} />}
            variant='bordered'
          >
            Continue with Google
          </Button>
        </div>
        <p className='text-center text-small'>
          Need to create an account?&nbsp;
          <Link
            size='sm'
            className='cursor-pointer'
            onPress={() => handleNavigate(authUrls.register)}
          >
            Sign Up
          </Link>
        </p>

        <div className='flex items-center justify-center'>
          <ThemeSwitchButton />
        </div>
      </div>

      <ModalBase
        isOpen={isModalOpen}
        onClose={closeModal}
        modalTitle='Forgot Password'
        modalBody={<ForgotPasswordForm onClose={closeModal} getEmail={formik.values.email} />}
        modalFooter={null}
      />
    </div>
  )
}
