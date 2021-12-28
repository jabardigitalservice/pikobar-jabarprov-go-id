export const identity = {
  title: 'Identitas Pemohon',
  data: [
    {
      label: 'Nama Pemohon',
      model: 'name'
    },
    {
      label: 'NIK',
      model: 'nik'
    },
    {
      label: 'Tanggal Lahir',
      model: 'birth_date'
    },
    {
      label: 'Email',
      model: 'email'
    },
    {
      label: 'No. HP Pemohon',
      model: 'phone_primary'
    },
    {
      label: 'No. HP Pengganti',
      model: 'phone_secondary'
    },
    {
      label: 'KTP',
      model: 'ktp_photo',
      isImage: true
    }
  ]
}
export const address = {
  title: 'Alamat Pemohon',
  data: [
    {
      label: 'Kota/Kabupaten',
      model: 'city_id'
    },
    {
      label: 'Kecamatan',
      model: 'district_id'
    },
    {
      label: 'Kelurahan',
      model: 'subdistrict_id'
    },
    {
      label: 'RT',
      model: 'rt'
    },
    {
      label: 'RW',
      model: 'rw'
    },
    {
      label: 'Patokan Jalan',
      model: 'landmark'
    },
    {
      label: 'Alamat Lengkap',
      model: 'address'
    }
  ]
}
export const medical = {
  title: 'Data Medis Pemohon',
  data: [
    {
      label: 'Lokasi Tes Lab',
      model: 'test_location_id'
    },
    {
      label: 'Melaporkan RT/RW/Puskesmas',
      model: 'is_reported'
    },
    {
      label: 'Tracing oleh RT/RW/Puskesmas',
      model: 'is_reported_tracing'
    },
    {
      label: 'Jenis Tes',
      model: 'test_type_id'
    },
    {
      label: 'Bukti Tes PCR/Antigen',
      model: 'test_result_photo',
      isImage: true
    }
  ]
}
