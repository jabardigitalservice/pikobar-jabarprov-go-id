export default [
  {
    label: 'Informasi Medis',
    type: 'heading',
    class: 'title'
  },
  {
    label: 'Tanggal Pemeriksaan',
    required: true,
    model: 'date_check',
    name: 'Tanggal Pemeriksaan',
    rules: 'required',
    type: 'date',
    class: 'md:block md:w-full'
  },
  {
    label: 'Tanggal Terkonfirmasi',
    model: 'date_confirmation',
    name: 'Tanggal Terkonfirmasi Positif',
    type: 'date',
    class: 'md:block md:w-full',
    required: true,
    rules: 'required'
  },
  {
    label: 'Lokasi Tes',
    required: true,
    model: 'test_location_id',
    name: 'Lokasi Tes Lab',
    rules: 'required',
    class: 'md:block md:w-full',
    type: 'select'
  },
  {
    label: 'Lokasi Tes Lainnya',
    model: 'other_test_location',
    name: 'Lokasi Lainnya',
    class: 'inline-block w-full hidden',
    type: 'area',
    placeholder: 'Masukkan nama tempat lokasi jika tidak terdapat pada pilihan di samping'
  },
  {
    label: 'Jenis Tes yang Digunakan',
    required: true,
    model: 'test_type_id',
    name: 'Jenis Tes',
    rules: 'required',
    class: 'md:block md:w-full',
    type: 'select'
  },
  {
    label: 'Apakah Anda sudah melapor pada RT/RW/Puskesmas terdekat?',
    required: true,
    model: 'is_reported',
    name: 'Pernyataan melapor',
    rules: 'required',
    class: 'md:block md:w-full',
    type: 'radio'
  },
  {
    label: 'Apakah Anda sudah memiliki kontak RT/RW/Puskesmas/Satgas terdekat untuk melakukan tracing/pelacakan kontak erat?',
    required: true,
    model: 'is_reported_tracing',
    name: 'Pernyataan tracing',
    rules: 'required',
    class: 'md:block md:w-full',
    type: 'radio'
  }
]
