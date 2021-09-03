import { required, email, numeric, length, mimes, image } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'
import { isPhoneNumber } from './validate'
import { checkNikAvailability } from '~/api/isoman'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'Please enter an email address'
})

extend('isPhoneNumber', {
  validate: (val) => {
    return isPhoneNumber(val)
  },
  message: 'Please enter a phone number'
})

extend('numeric', {
  ...numeric,
  message: 'This field must be filled with number'
})

extend('length', {
  ...length,
  message: 'This field must be {length} characters'
})

extend('mimes', {
  ...mimes,
  message: 'File type doesn\'t match the requirement'
})

extend('image', {
  ...image,
  message: 'This field must be filled with image'
})

extend('nikAvailability', {
  validate: async (val) => {
    if (val.length === 16) {
      try {
        await checkNikAvailability({
          nik: val
        })
        return true
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  },
  message: 'NIK is already registered'
})
