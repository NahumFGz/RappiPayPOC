import { Button, Input, Checkbox, Link, Divider, Select, SelectItem } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { AcmeIcon } from '../../../assets/SocialIcons'
import { useNavigate } from 'react-router-dom'
import { authUrls } from '../../../routes/urls/authUrls'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthAPI } from '../hooks/useAuthAPI'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  birthday: Yup.string()
    .matches(/^\d{2}-\d{2}-\d{4}$/, 'Birthday must be in dd-mm-yyyy format')
    .required('Birthday is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[!@#$%^&*,;.])/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
})

const formatDate = (value) => {
  const numericValue = value.replace(/\D/g, '')
  const day = numericValue.slice(0, 2)
  const month = numericValue.slice(2, 4)
  const year = numericValue.slice(4, 8)

  if (numericValue.length <= 2) {
    return day
  } else if (numericValue.length <= 4) {
    return `${day}-${month}`
  } else {
    return `${day}-${month}-${year}`
  }
}

export function Register() {
  const { registerUser } = useAuthAPI()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const handleNavigate = (url) => {
    navigate(url)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      birthday: '',
      gender: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    validationSchema,
    onSubmit: async (values) => {
      const newValues = {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        gender: values.gender,
        birth_date: values.birthday.split('-').reverse().join('-'),
        password: values.password,
        password2: values.confirmPassword
      }

      try {
        const response = await registerUser(newValues)
        const responseMessage = response.email[0]

        if (responseMessage.includes('user with this email already exists')) {
          toast.info('El usuario ya existe')
        } else {
          toast.success('Usuario registrado')
        }
        navigate(authUrls.login)
      } catch (error) {
        toast.info(error.message)
      }
    }
  })

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center pb-2'>
        <div
          title='Haz clic para ir a la página de inicio'
          className='cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out transform hover:scale-110'
        >
          <AcmeIcon size={60} />
        </div>
        <p className='text-xl font-medium'>Welcome</p>
        <p className='text-small text-default-500'>Create your account to get started</p>
      </div>
      <div className='mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small'>
        <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
          <Input
            id='email'
            name='email'
            label='Email Address'
            placeholder='Enter your email'
            type='email'
            variant={formik.touched.email && formik.errors.email ? 'flat' : 'bordered'}
            color={formik.touched.email && formik.errors.email ? 'danger' : 'default'}
            autocomplete='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <Input
            id='firstName'
            name='firstName'
            label='First Name'
            placeholder='Enter your first name'
            type='text'
            variant={formik.touched.firstName && formik.errors.firstName ? 'flat' : 'bordered'}
            color={formik.touched.firstName && formik.errors.firstName ? 'danger' : 'default'}
            autocomplete='given-name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />

          <Input
            id='lastName'
            name='lastName'
            label='Last Name'
            placeholder='Enter your last name'
            type='text'
            variant={formik.touched.lastName && formik.errors.lastName ? 'flat' : 'bordered'}
            color={formik.touched.lastName && formik.errors.lastName ? 'danger' : 'default'}
            autocomplete='family-name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />

          <Input
            id='birthday'
            name='birthday'
            label='Birthday'
            placeholder='dd-mm-yyyy'
            type='text'
            variant={formik.touched.birthday && formik.errors.birthday ? 'flat' : 'bordered'}
            color={formik.touched.birthday && formik.errors.birthday ? 'danger' : 'default'}
            autocomplete='bday'
            onChange={(e) => {
              const formattedValue = formatDate(e.target.value)
              formik.setFieldValue('birthday', formattedValue)
            }}
            onBlur={formik.handleBlur}
            value={formik.values.birthday}
          />

          <Select
            id='gender'
            name='gender'
            aria-label='Gender'
            placeholder='Select your gender'
            label='Gender'
            variant={formik.touched.gender && formik.errors.gender ? 'flat' : 'bordered'}
            color={formik.touched.gender && formik.errors.gender ? 'danger' : 'default'}
            defaultSelectedKeys={[formik.values.gender]}
            className='max-w-xs'
            onSelectionChange={(key) => formik.setFieldValue('gender', key.anchorKey)}
          >
            <SelectItem key='M'>Male</SelectItem>
            <SelectItem key='F'>Female</SelectItem>
            <SelectItem key='O'>Other</SelectItem>
          </Select>

          <Input
            id='password'
            name='password'
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
            placeholder='Enter your password'
            type={isVisible ? 'text' : 'password'}
            variant={formik.touched.password && formik.errors.password ? 'flat' : 'bordered'}
            color={formik.touched.password && formik.errors.password ? 'danger' : 'default'}
            autocomplete='new-password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? 'border-red-500' : ''}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.password}</p>
          ) : null}

          <Input
            id='confirmPassword'
            name='confirmPassword'
            endContent={
              <button type='button' onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
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
            label='Confirm Password'
            placeholder='Confirm your password'
            type={isConfirmVisible ? 'text' : 'password'}
            variant={
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'flat' : 'bordered'
            }
            color={
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'danger' : 'default'
            }
            autocomplete='new-password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'border-red-500'
                : ''
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.confirmPassword}</p>
          ) : null}

          <Checkbox
            id='terms'
            name='terms'
            className='py-4'
            size='sm'
            onChange={formik.handleChange}
            isSelected={formik.values.terms}
          >
            I agree with the&nbsp;
            <Link size='sm' onPress={() => handleNavigate(authUrls.termsOfService)}>
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link size='sm' onPress={() => handleNavigate(authUrls.privacyPolicy)}>
              Privacy Policy
            </Link>
          </Checkbox>
          <Button
            color='primary'
            type='submit'
            isDisabled={!formik.isValid || !formik.values.terms}
          >
            Sign Up
          </Button>
        </form>
        <div className='flex items-center gap-4'>
          <Divider className='flex-1' />
          <p className='shrink-0 text-tiny text-default-500'>OR</p>
          <Divider className='flex-1' />
        </div>
        <p className='text-center text-small cursor-pointer'>
          Already have an account?&nbsp;
          <Link size='sm' onPress={() => handleNavigate(authUrls.login)}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
