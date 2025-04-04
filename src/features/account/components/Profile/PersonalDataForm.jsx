import { useEffect, useState } from 'react'
import { Input, Button, Select, SelectItem } from '@nextui-org/react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { useProfileApi } from '../../hooks/useProfileApi'
import { useAuthAPI } from '../../../auth/hooks/useAuthAPI'
import { useAuthStore } from '../../../../store/AuthStore'

const GENDER_CHOICES = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
  { label: 'Otro', value: 'O' }
]

const DOC_CHOICES = [
  { label: 'DNI', value: 'DNI' },
  { label: 'Pasaporte', value: 'PA' },
  { label: 'Carné de extranjería', value: 'CE' }
]

export function PersonalDataForm() {
  const [flag, setFlag] = useState(false)
  const [accountData, setAccountData] = useState()
  const { getAccountApiCall, patchAccountApiCall } = useProfileApi()

  const { authMe } = useAuthAPI()
  const profile = useAuthStore((state) => state.profile)
  const setProfile = useAuthStore((state) => state.setProfile)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      documentType: '',
      documentNumber: '',
      phoneCountryCode: '',
      phoneNumber: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      birthDate: Yup.date().required('Birth date is required'),
      gender: Yup.string().required('Gender is required'),
      documentType: Yup.string().required('Document type is required'),
      documentNumber: Yup.string().required('Document number is required'),
      phoneCountryCode: Yup.string().required('Phone country code is required'),
      phoneNumber: Yup.string().required('Phone number is required')
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        // Patch para actualizar los datos personales
        await patchAccountApiCall(values)

        // Actualiza los datos del perfil
        const responseMe = await authMe()
        setProfile(responseMe)

        toast.success('Personal data submitted successfully')
      } catch {
        toast.error('Error submitting personal data')
      }
    }
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccountApiCall()
        setAccountData(data)
        setFlag(true)
      } catch {
        console.log('Error fetching account data')
      }
    }

    if (profile) {
      fetchData()
    }
  }, [getAccountApiCall, profile])

  useEffect(() => {
    if (accountData) {
      formik.setValues({
        firstName: accountData.firstName || '',
        lastName: accountData.lastName || '',
        birthDate: accountData.birthDate || '',
        gender: accountData.gender || '',
        documentType: accountData.documentType || '',
        documentNumber: accountData.documentNumber || '',
        phoneCountryCode: accountData.phoneCountryCode || '',
        phoneNumber: accountData.phoneNumber || ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag])

  const handlePhoneCountryCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Remove all non-numeric characters
    formik.setFieldValue('phoneCountryCode', `+${value}`)
  }

  return (
    <form className='mt-8' onSubmit={formik.handleSubmit} noValidate>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Personal Data</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>Update your personal data.</p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:col-span-2'>
            <div className='col-span-1'>
              <Input
                id='firstName'
                name='firstName'
                isRequired
                label='First name'
                labelPlacement='outside'
                placeholder='Enter your first name'
                variant='flat'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.firstName && formik.errors.firstName ? 'danger' : 'default'}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.firstName}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='lastName'
                name='lastName'
                isRequired
                label='Last name'
                labelPlacement='outside'
                placeholder='Enter your last name'
                variant='flat'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.lastName && formik.errors.lastName ? 'danger' : 'default'}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.lastName}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='birthDate'
                name='birthDate'
                isRequired
                label='Birth date'
                labelPlacement='outside'
                placeholder='Enter your birth date'
                type='date'
                variant='flat'
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.birthDate && formik.errors.birthDate ? 'danger' : 'default'}
              />
              {formik.touched.birthDate && formik.errors.birthDate && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.birthDate}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Select
                id='gender'
                name='gender'
                isRequired
                label='Gender'
                labelPlacement='outside'
                placeholder='Select your gender'
                variant='flat'
                selectedKeys={[formik.values.gender]}
                onSelectionChange={(keys) =>
                  formik.setFieldValue('gender', keys.values().next().value)
                }
                onBlur={formik.handleBlur}
                color={formik.touched.gender && formik.errors.gender ? 'danger' : 'default'}
              >
                {GENDER_CHOICES.map((choice) => (
                  <SelectItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </SelectItem>
                ))}
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.gender}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Select
                id='documentType'
                name='documentType'
                isRequired
                label='Document type'
                labelPlacement='outside'
                placeholder='Select document type'
                variant='flat'
                selectedKeys={[formik.values.documentType]}
                onSelectionChange={(keys) =>
                  formik.setFieldValue('documentType', keys.values().next().value)
                }
                onBlur={formik.handleBlur}
                color={
                  formik.touched.documentType && formik.errors.documentType ? 'danger' : 'default'
                }
              >
                {DOC_CHOICES.map((choice) => (
                  <SelectItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </SelectItem>
                ))}
              </Select>
              {formik.touched.documentType && formik.errors.documentType && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.documentType}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='documentNumber'
                name='documentNumber'
                isRequired
                label='Document number'
                labelPlacement='outside'
                placeholder='Enter your document number'
                variant='flat'
                value={formik.values.documentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.documentNumber && formik.errors.documentNumber
                    ? 'danger'
                    : 'default'
                }
              />
              {formik.touched.documentNumber && formik.errors.documentNumber && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.documentNumber}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='phoneCountryCode'
                name='phoneCountryCode'
                autoComplete='tel-country-code'
                isRequired
                label='Phone country code'
                labelPlacement='outside'
                placeholder='Enter phone country code'
                variant='flat'
                value={formik.values.phoneCountryCode}
                onChange={handlePhoneCountryCodeChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.phoneCountryCode && formik.errors.phoneCountryCode
                    ? 'danger'
                    : 'default'
                }
              />
              {formik.touched.phoneCountryCode && formik.errors.phoneCountryCode && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.phoneCountryCode}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='phoneNumber'
                name='phoneNumber'
                isRequired
                label='Phone number'
                labelPlacement='outside'
                placeholder='Enter your phone number'
                variant='flat'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.phoneNumber && formik.errors.phoneNumber ? 'danger' : 'default'
                }
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.phoneNumber}</p>
              )}
            </div>

            <div className='col-span-2'>
              <Button type='submit' color='primary' isDisabled={!formik.dirty || !formik.isValid}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
