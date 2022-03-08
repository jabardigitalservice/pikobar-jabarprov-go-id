export const identity = {
  title: 'Identitas Diri',
  data: [
    {
      label: 'Nama Lengkap',
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
      label: 'Nomor HP',
      model: 'phone_primary'
    },
    {
      label: 'Nomor kontak lainnya',
      model: 'phone_secondary'
    },
    {
      label: 'Alamat Pengiriman',
      model: 'address'
    }
  ]
}
export const medical = {
  title: 'Informasi Medis',
  data: [
    {
      label: 'Tanggal Pemeriksaan',
      model: 'date_check'
    },
    {
      label: 'Tanggal Terkonfirmasi',
      model: 'date_confirmation'
    },
    {
      label: 'Lokasi Tes',
      model: 'test_location_id'
    },
    {
      label: 'Jenis Tes',
      model: 'test_type_id'
    }
  ]
}
export const evidence = {
  title: 'Bukti Foto',
  data: [
    {
      label: 'KTP',
      model: 'ktp_photo',
      isImage: true
    },
    {
      label: 'Bukti Tes PCR/Antigen',
      model: 'test_result_photo',
      isImage: true
    }
  ]
}
