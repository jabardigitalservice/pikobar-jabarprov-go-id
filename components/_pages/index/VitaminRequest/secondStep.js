export default [
  {
    label: 'Tanggal Pemeriksaan',
    required: true,
    model: 'date_check',
    name: 'Tanggal Pemeriksaan',
    note: 'Diisi dengan tanggal dilakukan tes Covid-19',
    rules: 'required',
    type: 'date',
    class: 'md:block md:w-8/12'
  },
  {
    label: 'Tanggal Terkonfirmasi Positif',
    model: 'date_confirmation',
    name: 'Tanggal Terkonfirmasi Positif',
    note: 'Digunakan untuk petugas mengetahui jumlah dosis obat/vitamin yang akan diberikan',
    type: 'date',
    class: 'md:block md:w-8/12',
    required: true,
    rules: 'required'
  },
  {
    label: 'Lokasi Tes Lab',
    required: true,
    model: 'test_location_id',
    name: 'Lokasi Tes Lab',
    note: 'Pilih lokasi pengetesan, Jika tidak ada, pilih Lainnya',
    rules: 'required',
    class: 'md:inline-block md:w-6/12 md:pr-5',
    type: 'select'
  },
  {
    label: 'Lokasi Lainnya',
    model: 'other_test_location',
    name: 'Lokasi Lainnya',
    note: 'Masukkan nama tempat lokasi jika tidak terdapat pada pilihan di samping',
    placeholder: 'Masukkan nama tempat lokasi jika tidak terdapat pada pilihan di samping',
    class: 'md:inline-block md:w-6/12'
  },
  {
    label: 'Jenis Tes Yang Digunakan',
    required: true,
    model: 'test_type_id',
    name: 'Jenis Tes',
    note: 'Jenis tes yang dipilih yakni tes yang digunakan dalam pemeriksaan Covid-19',
    rules: 'required',
    class: 'md:block md:w-8/12',
    type: 'select'
  },
  {
    label: 'Unggah Foto/File Hasil Tes Konfirmasi Positif',
    required: true,
    model: 'test_result_photo',
    name: 'Foto Hasil Tes',
    note: 'Digunakan untuk petugas memverifikasi hasil test terkonfirmasi positif',
    rules: 'required|image|mimes:png,jpg,jpeg|size:10000',
    accept: '.png,.jpg,.jpeg',
    class: 'md:block md:w-8/12',
    type: 'file'
  },
  {
    label: 'Apakah sudah melapor kepada RT/RW/Puskesmas terdekat?',
    required: true,
    model: 'is_reported',
    name: 'Pernyataan melapor',
    rules: 'required',
    class: 'md:block md:w-8/12',
    type: 'radio'
  },
  {
    label: 'Apakah sudah ada kontak RT/ RW/ Puskesmas/Satgas terdekat untuk mengecek tracing/kontak erat?',
    required: true,
    model: 'is_reported_tracing',
    name: 'Pernyataan tracing',
    rules: 'required',
    class: 'md:block md:w-8/12',
    type: 'radio'
  }
]
