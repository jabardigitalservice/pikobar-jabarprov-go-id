export default [
  {
    label: 'NIK',
    required: true,
    model: 'nik',
    name: 'NIK',
    placeholder: 'Tulis NIK',
    rules: 'required|length:16|numeric|nikAvailability',
    class: 'md:block md:w-full'
  },
  {
    label: 'Nama Lengkap',
    required: true,
    model: 'name',
    name: 'Nama Lengkap',
    placeholder: 'Tulis nama lengkap',
    rules: 'required',
    class: 'md:block md:w-full'
  },
  {
    label: 'Tanggal Lahir',
    required: true,
    model: 'birth_date',
    name: 'Tanggal Lahir',
    rules: 'required',
    class: 'md:block md:w-full',
    type: 'date'
  },
  {
    label: 'Nomor HP',
    required: true,
    placeholder: 'Tulis nomor hp',
    model: 'phone_primary',
    name: 'Nomor Telepon',
    rules: 'required|isPhoneNumber',
    class: 'md:block md:w-full'
  },
  {
    label: 'Nomor Kontak Lainnya',
    placeholder: 'Tulis nomor kontak lainnya',
    required: true,
    model: 'phone_secondary',
    name: 'Nomor Telepon Lainnya',
    rules: 'required|isPhoneNumber',
    class: 'md:block md:w-full'
  },
  {
    label: 'Email Terdaftar di Pikobar',
    model: 'email',
    required: false,
    name: 'Email',
    placeholder: 'Tulis email yang terdaftar',
    rules: 'email',
    class: 'md:block md:w-full'
  }
]
