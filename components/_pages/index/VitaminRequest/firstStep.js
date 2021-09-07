export default [
  {
    label: 'Nama Lengkap',
    required: true,
    model: 'name',
    name: 'Nama Lengkap',
    placeholder: 'Nama Lengkap',
    note: 'Diisi dengan nama lengkap sesuai KTP',
    rules: 'required'
  },
  {
    label: 'Nomor Induk Kependudukan (NIK)',
    required: true,
    model: 'nik',
    name: 'nik',
    placeholder: 'NIK',
    note: 'Diisi dengan Nomor Induk Kependudukan Pemohon',
    rules: 'required|length:16|numeric|nikAvailability',
    class: 'md:block md:w-8/12'
  },
  {
    label: 'Unggah Foto KTP',
    required: true,
    model: 'ktp_photo',
    name: 'ktp',
    note: 'Digunakan untuk petugas memvalidasi identitas pemohon',
    rules: 'required|image|mimes:png,jpg,jpeg,gif',
    accept: '.png,.jpg,.jpeg,.gif',
    class: 'md:block md:w-8/12',
    type: 'file'
  },
  {
    label: 'Tanggal Lahir',
    required: true,
    model: 'birth_date',
    name: 'borndate',
    note: 'Digunakan untuk menyesuaikan umur pemohon dengan jenis obat',
    rules: 'required',
    class: 'md:block md:w-8/12',
    type: 'date'
  },
  {
    label: 'Nomor telepon yang dapat dihubungi',
    required: true,
    model: 'phone_primary',
    name: 'phone_primary',
    note: 'Diisi dengan nomor telepon yang terhubung WhatsApp',
    rules: 'required|isPhoneNumber',
    class: 'md:inline-block md:w-6/12 md:pr-5'
  },
  {
    label: 'Nomor telepon lainnya yang dapat dihubungi',
    required: true,
    model: 'phone_secondary',
    name: 'phone_secondary',
    note: 'Diisi dengan nomor telepon yang terhubung WhatsApp',
    rules: 'required|isPhoneNumber',
    class: 'md:inline-block md:w-6/12'
  },
  {
    label: 'Email',
    model: 'email',
    name: 'email',
    placeholder: 'Alamat Email',
    note: 'Dapat diisi dengan email yang aktif (jika ada)',
    rules: 'email',
    class: 'md:block md:w-8/12'
  },
  {
    label: 'Kota/Kabupaten',
    required: true,
    model: 'city_id',
    name: 'city',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Kecamatan',
    required: true,
    model: 'district_id',
    name: 'district',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Kelurahan',
    required: true,
    model: 'subdistrict_id',
    name: 'subdistrict',
    rules: 'required',
    class: 'md:inline-block md:w-4/12',
    type: 'select'
  },
  {
    label: 'RT',
    required: true,
    model: 'rt',
    name: 'rt',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'RW',
    required: true,
    model: 'rw',
    name: 'rw',
    rules: 'required',
    class: 'md:inline-block md:w-4/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Alamat Tempat Tinggal Saat Ini',
    placeholder: 'Alamat domisili saat ini',
    model: 'address',
    name: 'address',
    note: 'Diisi dengan domisili berada di wilayah Provinsi Jawa Barat',
    class: 'inline-block w-full',
    type: 'area',
    rules: 'required',
    required: true
  },
  {
    label: 'Keterangan lain/Patokan jalan',
    model: 'landmark',
    name: 'landmark',
    placeholder: 'Patokan Jalan',
    rules: 'required',
    required: true
  }
]
