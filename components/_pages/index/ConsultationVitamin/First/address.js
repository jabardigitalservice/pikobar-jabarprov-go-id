export default [
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
