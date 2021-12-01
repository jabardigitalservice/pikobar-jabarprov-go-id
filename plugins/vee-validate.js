import {
  required,
  email,
  numeric,
  length,
  mimes,
  image,
  size
} from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'
import { isPhoneNumber } from './validate'
import { checkNikAvailability } from '~/api/isoman'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: (_, values) => `${values._field_} harus diisi`
})

extend('email', {
  ...email,
  message: 'Email tidak valid'
})

extend('isPhoneNumber', {
  validate: (val) => {
    return isPhoneNumber(val)
  },
  message: 'Nomor telepon tidak valid'
})

extend('numeric', {
  ...numeric,
  message: (_, values) => `${values._field_} harus diisi dengan angka`
})

extend('length', {
  ...length,
  message: (_, values) => `${values._field_} harus berisi ${values.length} karakter`
})

extend('mimes', {
  ...mimes,
  message: (_, values) => `File ${values._field_} tidak sesuai format`
})

extend('image', {
  ...image,
  message: (_, values) => `${values._field_} harus berisi gambar`
})

extend('size', {
  ...size,
  message: (_, values) => `Ukuran file ${values._field_} maksimal ${values.size / 1000}MB`
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
  message: 'NIK telah terdaftar'
})
