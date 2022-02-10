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
      label: 'Kota/Kabupaten Tempat Tinggal Saat Ini',
      model: 'city_id'
    },
    {
      label: 'Kecamatan Tempat Tinggal Saat Ini',
      model: 'district_id'
    },
    {
      label: 'Kelurahan Tempat Tinggal Saat Ini',
      model: 'subdistrict_id'
    },
    {
      label: 'RT Tempat Tinggal Saat Ini',
      model: 'rt'
    },
    {
      label: 'RW Tempat Tinggal Saat Ini',
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
