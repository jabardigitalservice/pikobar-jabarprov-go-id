export default [
  {
    label: 'Identitas Diri',
    type: 'heading',
    class: 'title'
  },
  {
    label: 'NIK',
    required: true,
    model: 'nik',
    name: 'NIK',
    placeholder: 'Tulis NIK',
    rules: 'required|length:16|numeric|nikAvailability',
    class: 'md:block md:w-full',
    requestType: 'obat_vitamin'
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
  },
  {
    label: 'Alamat Pengiriman',
    type: 'heading',
    class: 'title'
  },
  {
    label: 'Kota/Kabupaten',
    required: true,
    placeholder: 'Pilih kota/kab.',
    model: 'city_id',
    name: 'Kota/Kabupaten',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Kecamatan',
    required: true,
    placeholder: 'Pilih kecamatan',
    model: 'district_id',
    name: 'Kecamatan',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Kelurahan',
    required: true,
    placeholder: 'Pilih kelurahan',
    model: 'subdistrict_id',
    name: 'Kelurahan',
    rules: 'required',
    class: 'md:inline-block md:w-4/12',
    type: 'select'
  },
  {
    label: 'RT',
    required: true,
    placeholder: 'Tulis RT',
    model: 'rt',
    name: 'RT',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'RW',
    required: true,
    placeholder: 'Tulis RW',
    model: 'rw',
    name: 'RW',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Alamat Lengkap',
    placeholder: 'Contoh: Jl. Dipenogoro No.22',
    model: 'address',
    name: 'Alamat',
    class: 'inline-block w-full',
    type: 'area',
    rules: 'required',
    required: true
  },
  {
    label: 'Catatan',
    model: 'landmark',
    name: 'Patokan Jalan',
    placeholder: 'Contoh: Samping pos RW rumah pagar hitam.',
    rules: 'required',
    required: true
  }
]
