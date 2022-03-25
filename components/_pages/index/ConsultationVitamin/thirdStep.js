export default [
  {
    label: 'Unggah Foto KTP & Bukti PCR/Antigen',
    type: 'heading',
    class: 'title',
    step: 3
  },
  {
    label: 'Unggah Foto KTP',
    required: true,
    model: 'ktp_photo',
    name: 'KTP',
    rules: 'required|mimes:png,jpg,jpeg,pdf|size:5000',
    accept: '.png,.jpg,.jpeg,.pdf',
    class: 'md:block md:w-8/12',
    type: 'file'
  },
  {
    label: 'Unggah Bukti PCR/Antigen',
    required: true,
    model: 'test_result_photo',
    name: 'Foto Hasil Tes',
    rules: 'required|mimes:png,jpg,jpeg,pdf|size:5000',
    accept: '.png,.jpg,.jpeg,.pdf',
    class: 'md:block md:w-8/12',
    type: 'file'
  }
]
